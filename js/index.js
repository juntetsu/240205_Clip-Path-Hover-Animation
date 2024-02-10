const section = document.querySelector(".section");
const sectionListItem = document.querySelectorAll(".section__list-item");
const sectionListItemText = document.querySelectorAll(
  ".section__list-item > h1"
);
const sectionListFigure = document.querySelectorAll(
  ".section__list-item-figure"
);
const sectionMedia = document.querySelectorAll(".section__media");

const clipPath = {
  top: "polygon(0 0, 100% 0, 100% 0, 0 0)",
  full: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  bottom: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
};

gsap.set(sectionMedia, { clipPath: clipPath.top });

const initAnimation = () => {
  gsap.set(sectionListItemText, { y: "100%" });

  const tlText = gsap.timeline({
    defaults: { duration: 1.48, ease: "expo.inOut" },
  });
  tlText
    .to(sectionListItemText, {
      y: "0%",
      stagger: 0.06,
    })
    .from(
      sectionListFigure,
      {
        width: 0,
        // stagger: 0.06,
      },
      0.8
    );

  addEventListeners();
};

const addEventListeners = () => {
  sectionListItem.forEach((item, index) => {
    const images = sectionMedia[index]?.children;

    item.addEventListener("mouseenter", () => {
      for (let i = 0; i < images.length; i++) {
        gsap
          .timeline({
            defaults: { duration: 0.64, ease: "expo.inOut", overwrite: true },
          })
          .to(sectionMedia[index], {
            clipPath: clipPath.full,
          });

        sectionListItem.forEach((otherItem) => {
          otherItem === item
            ? (otherItem.style.color = "#b89e14")
            : (otherItem.style.opacity = 0.5);
        });
      }
    });

    item.addEventListener("mouseleave", () => {
      for (let i = 0; i < images.length; i++) {
        gsap
          .timeline({
            defaults: { duration: 0.64, ease: "expo.inOut", overwrite: true },
          })
          .to(sectionMedia[index], {
            clipPath: clipPath.bottom,
            onComplete: () => {
              gsap.set(sectionMedia[index], {
                clipPath: clipPath.top,
              });
            },
          });
      }

      sectionListItem.forEach((otherItem) => {
        otherItem === item
          ? (otherItem.style.color = "#181818")
          : (otherItem.style.opacity = 1);
      });
    });
  });
};

initAnimation();
