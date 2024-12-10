export interface Feature {
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface LandingContent {
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  features: Feature[];
  ctaTitle: string;
  ctaDescription: string;
}