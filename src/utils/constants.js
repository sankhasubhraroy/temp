const navLinks = [
  { title: "Home", url: "/" },
  { title: "About", url: "/about" },
  { title: "Service", url: "/service" },
  { title: "Contact", url: "/contact" },
];

const unsplashUrl = "https://source.unsplash.com/random/1280×720/?";
const unsplashKeywords = [
  "business",
  "company",
  "computer",
  "analytics",
  "freelancer",
  "football",
  "science",
  "logo",
  "design",
  "nature",
];

const backgroundSlides = unsplashKeywords.map((keyword) => {
  return {
    title: keyword,
    url: unsplashUrl + keyword,
  };
});

const routeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export { backgroundSlides, navLinks, routeVariants };
