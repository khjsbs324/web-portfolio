/* global jQuery, gsap, ScrollTrigger */
(function ($) {
  "use strict";

  // Keep the content visible if a library cannot load.
  if (!$) return;

  $(function () {
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", function () {
      // (접속) 페이드 업: reveal the intro as its image becomes ready.
      const hero = document.querySelector(".hero-art");
      const image = hero.querySelector("img");
      const intro = gsap.fromTo(hero,
        { autoAlpha: 0, y: 56 },
        { autoAlpha: 1, y: 0, duration: 1.4, ease: "power3.out", paused: true, clearProps: "all" }
      );
      let active = true;
      const revealHero = function () { if (active) intro.play(); };

      if (image.complete) revealHero();
      else $(image).one("load.portfolio error.portfolio", revealHero);

      // (스크롤) 좌우 슬라이드: portrait from the left, details from the right.
      $("[data-slide]").each(function () {
        const distance = window.innerWidth <= 600 ? 36 : 90;
        gsap.set(this, { autoAlpha: 0, x: $(this).data("slide") === "left" ? -distance : distance });
        gsap.to(this,
          {
            autoAlpha: 1, x: 0, duration: 1.15, ease: "power3.out",
            scrollTrigger: { trigger: this, start: "top 85%", once: true, invalidateOnRefresh: true }
          }
        );
      });

      return function () {
        active = false;
        $(image).off(".portfolio");
      };
    });

    // Recalculate scroll positions when font metrics and images settle.
    if (document.fonts) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    $(window).on("load.portfolio", function () { ScrollTrigger.refresh(); });
    $(window).on("pageshow.portfolio", function (event) {
      if (event.originalEvent.persisted) ScrollTrigger.refresh();
    });
  });
})(window.jQuery);
