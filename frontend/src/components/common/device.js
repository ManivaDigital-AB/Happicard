// Mobile S - 320px
// Mobile M - 375px
// Mobile L - 425px
// Tablet - 768px
// Laptop - 1024px
// Laptop L - 1440px
// 4K - 2560px

const size = {
    mobileS: "319px",
    mobileM: "375px",
    mobileL: "425px",
    tablet: "768px",
    laptop: "1024px",
    laptopL: "1440px",
    desktop: "2560px",
  };
  
  export const device = {
    mobileS: `(min-width: ${size.mobileS})  and (max-width: 374px)`,
    mobileM: `(min-width: ${size.mobileM}) and (max-width: 424px)`,
    mobileL: `(min-width: ${size.mobileL}) and (max-width: 767px)`,
    tablet: `(min-width: ${size.tablet}) and  (max-width: 1024px)`,
    laptop: `(min-width: ${size.laptop}) and (max-width: 2059px)`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`,
  };
  