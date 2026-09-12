// lib/testimonialsData.ts
// Curated client testimonials — real quotes only, added by hand as clients give
// them. This is deliberately NOT a public submission form (that suits MAHAGRO's
// many students, not an agency with a few high-value clients). The Testimonials
// component renders nothing while this list is empty, so an unpopulated section
// never ships and reads as "no clients."
//
// To add one, copy the shape below with the client's real words and permission:
//   {
//     quote: "Registrations came in from day one and the site never went down.",
//     author: "Owner's Name",
//     role: "Founder, MAHAGRO INDIA",
//     sourceUrl: "https://mahagroindia.com",
//   },
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  sourceUrl?: string;
  avatar?: string; // path under /public, optional
}

export const TESTIMONIALS: Testimonial[] = [
  // No fabricated quotes. Populate only with real, permissioned client words.
];
