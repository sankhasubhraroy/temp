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

export { backgroundSlides, navLinks };
