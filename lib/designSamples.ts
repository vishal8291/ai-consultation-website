/**
 * Quick concept pages made in Canva to show a prospect a look before we build.
 * These are shown and linked, never sold: Canva's licence doesn't allow its
 * templates or stock photos to be resold as our own product.
 */
export interface DesignSample {
  id: string;
  title: string;
  industry: string;
  description: string;
  url: string;
  previewImage: string;
}

export const DESIGN_SAMPLES: DesignSample[] = [
  {
    id: "real-estate-black-white",
    title: "Black & white real estate",
    industry: "Real estate",
    description: "A calm, monochrome site for a property agency, with listings, services and a WhatsApp enquiry button.",
    url: "https://customeai.my.canva.site/real-estate-website-in-black-white-style",
    previewImage: "/images/projects/sample-real-estate-bw.jpg",
  },
];
