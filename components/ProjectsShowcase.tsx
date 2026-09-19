"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS_DATA, Project } from "@/lib/projectsData";
import { DESIGN_SAMPLES } from "@/lib/designSamples";
import { ProjectGraphicSVG, ProjectIconSVG } from "@/components/AiSvgGraphics";
import { ExternalLink, CheckCircle2, ArrowRight, X, Sparkles, Cpu, Layers, Github, Globe, Globe2, Bot, LayoutGrid, AlertCircle } from "lucide-react";
import { loadRazorpayScript } from "@/lib/razorpay";
import { trackPurchase } from "@/lib/analytics";

interface ProjectsShowcaseProps {
  limit?: number;
  showFilters?: boolean;
  isHomepage?: boolean;
  hideHeader?: boolean;
}

const CATEGORIES = [
  { label: "All work", key: "All", icon: LayoutGrid },
  { label: "Websites", key: "Websites", icon: Globe2 },
  { label: "AI Agents", key: "AI Agents", icon: Bot },
  { label: "Apps & SaaS", key: "Apps & SaaS", icon: Layers },
] as const;

/** The three case studies featured on the homepage, in render order. */
const HOMEPAGE_PROJECT_IDS = [
  "lex-agent-legal-auditor",
  "mahagro-india-training-platform",
  "freelance-ai-sales-agent",
];

export default function ProjectsShowcase({ limit, showFilters = true, isHomepage = false, hideHeader = false }: ProjectsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const showreelRef = useRef<HTMLVideoElement | null>(null);

  /**
   * The autoplay attribute alone did not start this clip: measured on the
   * running page it sat fully buffered, muted and paused, with currentTime
   * frozen across two samples. So playback is requested explicitly, and the
   * rejection is swallowed rather than thrown, since a browser refusing
   * autoplay is a policy decision and not an error worth surfacing.
   *
   * The observer is the other half of it. The source is 4K, so decoding it
   * continuously for a element that is usually offscreen is wasted work on
   * exactly the low-powered phones this site is aimed at.
   */
  useEffect(() => {
    const video = showreelRef.current;
    if (!video) return;

    const attempt = () => {
      const played = video.play();
      if (played && typeof played.catch === "function") played.catch(() => {});
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? attempt() : video.pause()),
      { threshold: 0.25 }
    );
    observer.observe(video);
    attempt();

    return () => observer.disconnect();
  }, []);

  /**
   * Ready-built systems are charged in full rather than as a 50% advance,
   * because there is no delivery milestone to split around. The server resolves
   * the price from the product id, so only the id is sent here.
   */
  const handleBuyProduct = async (project: Project) => {
    if (!project.forSale) return;
    try {
      setBuyingId(project.id);

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Failed to load the payment SDK. Please check your internet connection.");
        setBuyingId(null);
        return;
      }

      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: project.id, currency: "INR" }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.orderId) {
        alert(orderData.error || "Failed to start the purchase.");
        setBuyingId(null);
        return;
      }

      // Display-only figure, taken from the server's authoritative response.
      const chargedAmount = orderData.advanceAmount as number;

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "CustomeAI",
        image: "/images/reallogo-transparent.png",
        description: `${project.title} (₹${chargedAmount.toLocaleString()})`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              tierName: project.title,
              amount: chargedAmount,
              currency: "INR",
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            trackPurchase({
              transactionId: response.razorpay_payment_id,
              value: chargedAmount,
              currency: "INR",
              tierName: project.title,
              kind: "product",
            });
            alert(`Payment received. Payment ID: ${response.razorpay_payment_id}. We will email you within 24 hours to arrange handover of ${project.title}.`);
          } else {
            alert(verifyData.error || "Payment verification failed. Please contact support.");
          }
          setBuyingId(null);
        },
        modal: {
          ondismiss: () => setBuyingId(null),
        },
        theme: {
          // Razorpay's modal is an iframe and cannot read our CSS variables, so
          // this must be kept in sync with --accent-strong in globals.css.
          color: "#0f76b0",
        },
      };

      const razorpayWindow = new (window as any).Razorpay(options);
      razorpayWindow.on("payment.failed", (response: any) => {
        console.error("Razorpay payment failed:", response.error);
        alert(`Payment failed: ${response.error?.description || "Please try again."}`);
        setBuyingId(null);
      });
      razorpayWindow.open();
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred while starting the purchase.");
      setBuyingId(null);
    }
  };

  let projectsToDisplay: Project[] = [];

  if (isHomepage || limit === 3) {
    // The homepage shortlist is named explicitly rather than derived (it used to
    // take the first project of each category, which meant the lineup changed
    // silently whenever PROJECTS_DATA was reordered). Edit this list to change
    // which three appear; order here is the order rendered.
    projectsToDisplay = HOMEPAGE_PROJECT_IDS.map((id) =>
      PROJECTS_DATA.find((p) => p.id === id)
    ).filter((p): p is Project => Boolean(p));
  } else {
    projectsToDisplay = PROJECTS_DATA.filter((project) => {
      if (selectedCategory === "All") return true;
      return project.category === selectedCategory;
    }).slice(0, limit || PROJECTS_DATA.length);
  }

  // "Veyra Residences: 3D Real Estate Launch Website" -> name + what it is.
  const splitTitle = (title: string) => {
    const i = title.indexOf(":");
    return i === -1 ? { name: title, kind: "" } : { name: title.slice(0, i), kind: title.slice(i + 1).trim() };
  };

  // Plain render helpers rather than nested components, so opening a case
  // study (a state change) doesn't remount and reload every preview image.
  const renderPreview = (project: Project, priority = false) => (
    <button
      type="button"
      onClick={() => setActiveModalProject(project)}
      aria-label={`Open the ${splitTitle(project.title).name} case study`}
      className="block w-full overflow-hidden rounded-xl border border-[var(--border-default)] bg-slate-100 aspect-[16/10] group/preview"
    >
      {project.previewImage ? (
        <img
          src={project.previewImage}
          alt={`${splitTitle(project.title).name} website preview`}
          width={800}
          height={500}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/preview:scale-[1.03]"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-6 bg-slate-900">
          <ProjectGraphicSVG type={project.svgType} />
        </div>
      )}
    </button>
  );

  const renderActions = (project: Project) => (
    <div className="flex items-center gap-5 text-sm font-semibold">
      <button
        type="button"
        onClick={() => setActiveModalProject(project)}
        className="inline-flex items-center gap-1.5 text-slate-900 hover:underline underline-offset-4"
      >
        Case study
        <ArrowRight className="w-4 h-4" />
      </button>
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 hover:underline underline-offset-4"
        >
          Live site
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );

  // Client work: one wide, editorial row per project, so a paid engagement
  // reads as a case study rather than one more tile in a grid.
  const renderFeatured = (project: Project) => {
    const { name, kind } = splitTitle(project.title);
    const results = [project.results.primary, project.results.secondary, project.results.roi].filter(Boolean);
    return (
      <article key={project.id} className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12 items-center">
        {renderPreview(project, true)}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Client project · {project.clientIndustry}
          </p>
          <h4 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">{name}</h4>
          {kind && <p className="mt-1 text-base text-slate-500">{kind}</p>}
          <p className="mt-4 text-[15px] leading-relaxed text-slate-700">{project.tagline}</p>
          <ul className="mt-6 border-t border-[var(--border-default)]">
            {results.map((r) => (
              <li key={r} className="flex items-start gap-3 border-b border-[var(--border-default)] py-3 text-sm text-slate-900">
                <CheckCircle2 className="mt-0.5 w-4 h-4 flex-shrink-0 text-slate-900" />
                {r}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            {renderActions(project)}
          </div>
        </div>
      </article>
    );
  };

  // Templates: a calm two-column catalogue. Large previews do the selling;
  // the text underneath answers "what is it" and "what does it cost".
  const renderCard = (project: Project, index: number) => {
    const { name, kind } = splitTitle(project.title);
    return (
      <motion.article
        key={project.id}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: (index % 2) * 0.06 }}
        className="flex flex-col"
      >
        {renderPreview(project)}
        <div className="mt-5 flex flex-1 flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            {project.clientIndustry}
          </p>
          <h4 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{name}</h4>
          {kind && <p className="mt-0.5 text-sm text-slate-500">{kind}</p>}
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{project.results.primary}</p>
          <div className="mt-auto pt-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-default)] pt-4">
              {project.forSale ? (
                <p className="text-sm text-slate-500">
                  <span className="text-lg font-semibold text-slate-900">{project.forSale.priceDisplayINR}</span>
                  {" "}one-time
                </p>
              ) : (
                <span />
              )}
              {renderActions(project)}
            </div>
          </div>
        </div>
      </motion.article>
    );
  };

  return (
    /* On the homepage the showreel starts flush against the band above it,
       so only the bottom keeps its padding (for the See work button). */
    <section id="projects" className={`relative ${isHomepage || limit === 3 ? "pt-0 pb-16" : "py-20"} bg-white text-slate-900 overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header. The homepage showreel already opens on its own
            "Our Works" title, so the written heading is shown only on the full
            projects page; the homepage keeps it for screen readers alone. */}
        {(isHomepage || limit === 3) && <h2 className="sr-only">Our work</h2>}
        {!hideHeader && !(isHomepage || limit === 3) && (
          <div className="mb-10">
            <div className="rule-hairline mb-8" />
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-normal text-slate-900 mb-3 tracking-[-0.03em] leading-[1.0]"
            >
              Case <span className="headline-accent">studies</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-medium"
            >
              Our client work, alongside ready-built templates we can launch for your business.
            </motion.p>
          </div>
        )}

        {/* Category Tabs (Shown on Portfolio page or when showFilters is enabled) */}
        {showFilters && !isHomepage && limit !== 3 && (
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.key;
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-md text-sm font-semibold flex items-center space-x-2 transition-all ${
                    isActive
                      ? "bg-slate-900 text-white border-2 border-slate-900"
                      : "bg-white hover:bg-slate-50 text-slate-700 border border-[var(--border-default)]"
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-500"}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Grouped rendering: on the full projects page, client work and
            independent builds are shown as separate, labelled sections so a real
            client result is never diluted by self-initiated demos. The homepage
            shortlist stays a single grid. */}
        {isHomepage || limit === 3 ? (
          /* The homepage shows a showreel and sends people to the full
             portfolio, rather than duplicating the project grid here. Muted
             and inline are both required for autoplay to be allowed at all;
             without them browsers silently refuse to start playback.
             It breaks out of the centred container to run edge to edge;
             the section clips any scrollbar-width overflow. */
          <div className="relative left-1/2 w-screen -translate-x-1/2 bg-black">
            <video
              ref={showreelRef}
              src="/images/project-showcase.mp4"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/project-showcase-poster.webp"
              preload="none"
              aria-label="Showreel of recent project work"
              className="w-full h-auto block"
            />
          </div>
        ) : (
          (() => {
            const clientWork = projectsToDisplay.filter((p) => p.engagement === "client");
            const independent = projectsToDisplay.filter((p) => p.engagement === "independent");
            return (
              <div className="space-y-24">
                {clientWork.length > 0 && (
                  <div>
                    <div className="mb-10 flex flex-wrap items-end justify-between gap-2 border-b border-[var(--border-default)] pb-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Client work</h3>
                        <p className="text-sm text-slate-500 mt-1">Paid engagements delivered for real businesses.</p>
                      </div>
                      <span className="hidden sm:inline text-sm text-slate-500 tabular-nums">{String(clientWork.length).padStart(2, "0")}</span>
                    </div>
                    <div className="space-y-16">
                      {clientWork.map((project) => renderFeatured(project))}
                    </div>
                  </div>
                )}
                {independent.length > 0 && (
                  <div>
                    <div className="mb-10 flex flex-wrap items-end justify-between gap-2 border-b border-[var(--border-default)] pb-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Our templates</h3>
                        <p className="text-sm text-slate-500 mt-1">Ready-built websites and systems we designed ourselves, rebranded and launched for your business.</p>
                      </div>
                      <span className="hidden sm:inline text-sm text-slate-500 tabular-nums">{String(independent.length).padStart(2, "0")}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
                      {independent.map((project, index) => renderCard(project, index))}
                    </div>
                  </div>
                )}
                {selectedCategory === "All" || selectedCategory === "Websites" ? (
                  <div>
                    <div className="mb-10 flex flex-wrap items-end justify-between gap-2 border-b border-[var(--border-default)] pb-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Design samples</h3>
                        <p className="text-sm text-slate-500 mt-1">Quick concept pages we make so you can see a look before we build it.</p>
                      </div>
                      <span className="hidden sm:inline text-sm text-slate-500 tabular-nums">{String(DESIGN_SAMPLES.length).padStart(2, "0")}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                      {DESIGN_SAMPLES.map((sample) => (
                        <article key={sample.id} className="flex flex-col">
                          <a
                            href={sample.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open the ${sample.title} sample in a new tab`}
                            className="block w-full overflow-hidden rounded-xl border border-[var(--border-default)] bg-slate-100 aspect-[16/10] group/preview"
                          >
                            <img
                              src={sample.previewImage}
                              alt={`${sample.title} website sample`}
                              width={800}
                              height={500}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/preview:scale-[1.03]"
                            />
                          </a>
                          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{sample.industry}</p>
                          <h4 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">{sample.title}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-slate-700">{sample.description}</p>
                          <a
                            href={sample.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:underline underline-offset-4"
                          >
                            View sample
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })()
        )}

        {/* SEE ALL PROJECTS CTA BUTTON (For Homepage View) */}
        {(isHomepage || limit === 3) && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href="/projects"
              className="btn-yellow-solid inline-flex items-center space-x-3 px-10 py-4 text-sm group"
            >
              <span>See work</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
            </Link>
          </motion.div>
        )}

      </div>

      {/* Project Case Study Details Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-black shadow-2xl p-6 sm:p-8 relative"
            >
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                aria-label="Close"
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="pr-10">
                  <h3 className="text-2xl font-semibold text-slate-900">{activeModalProject.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">Industry: {activeModalProject.clientIndustry}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs leading-relaxed text-slate-700">
                  <p className="font-bold text-slate-900 mb-1">Executive Summary:</p>
                  <p>{activeModalProject.description}</p>
                </div>

                {activeModalProject.results && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[activeModalProject.results.primary, activeModalProject.results.secondary, activeModalProject.results.roi]
                      .filter(Boolean)
                      .map((stat, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-black text-white text-center">
                          <p className="text-xs sm:text-sm font-semibold leading-tight">{stat}</p>
                        </div>
                      ))}
                  </div>
                )}

                {activeModalProject.problem && (
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">The challenge</h4>
                    <p className="text-sm leading-relaxed text-slate-700">{activeModalProject.problem}</p>
                  </div>
                )}

                {activeModalProject.solution && (
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">What we built</h4>
                    <p className="text-sm leading-relaxed text-slate-700">{activeModalProject.solution}</p>
                  </div>
                )}

                {activeModalProject.testimonial && (
                  <figure className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <blockquote className="text-sm leading-relaxed text-slate-900">
                      &ldquo;{activeModalProject.testimonial.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-2 text-xs text-slate-500">
                      {activeModalProject.testimonial.author}, {activeModalProject.testimonial.role}
                    </figcaption>
                  </figure>
                )}

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Key Features Delivered</h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {activeModalProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {activeModalProject.forSale && (
                  <div className="space-y-4 p-4 rounded-2xl border" style={{ borderColor: "var(--accent-strong)" }}>
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <span className="text-2xl font-semibold text-slate-900">
                        {activeModalProject.forSale.priceDisplayINR}
                      </span>
                      <span className="text-xs text-slate-500">
                        {activeModalProject.forSale.priceDisplayUSD} · paid once, not a subscription
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">What you get</h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {activeModalProject.forSale.whatYouGet.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Stated up front rather than discovered after paying: these
                        are third-party services the buyer funds themselves. */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">What you pay for separately</h4>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {activeModalProject.forSale.runningCosts.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-slate-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleBuyProduct(activeModalProject)}
                      disabled={buyingId === activeModalProject.id}
                      className="btn-yellow-solid w-full py-3 px-4 text-sm disabled:opacity-60"
                    >
                      {buyingId === activeModalProject.id
                        ? "Starting checkout..."
                        : `Buy for ${activeModalProject.forSale.priceDisplayINR}`}
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200">
                  {activeModalProject.demoUrl && (
                    <a
                      href={activeModalProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-black text-white font-semibold text-sm inline-flex items-center space-x-2 hover:bg-slate-800 transition-colors"
                    >
                      <span>Visit Live Application</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  {activeModalProject.githubUrl && (
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm inline-flex items-center space-x-2 hover:bg-slate-800 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>View GitHub Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
