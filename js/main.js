/* global gsap, ScrollTrigger */
(function ($) {
  "use strict";
  if (!$) return;

  $(function () {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let galleryScroll = null;

    media.add("(prefers-reduced-motion: no-preference)", function () {
      gsap.fromTo(".hero-art", { autoAlpha: 0, y: 32, scale: 0.98 }, {
        autoAlpha: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out"
      });

      $(".profile-person, .profile-copy > .headline, .detail, .closing-headline").each(function () {
        gsap.set(this, { autoAlpha: 0, y: 28 });
        gsap.to(this, {
          autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: this, start: "top 90%", once: true }
        });
      });

      gsap.fromTo(".project-card", { autoAlpha: 0, y: 32 }, {
        autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".projects", start: "top 90%", once: true }
      });
    });

    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", function () {
      const section = document.querySelector(".projects");
      const viewport = section.querySelector(".projects-window");
      const track = section.querySelector(".project-track");
      viewport.scrollLeft = 0;
      section.classList.add("is-pinned");
      const travel = function () { return Math.max(0, track.scrollWidth - viewport.clientWidth); };
      const tween = gsap.to(track, {
        x: function () { return -travel(); }, ease: "none",
        scrollTrigger: {
          trigger: section, start: "top top", end: function () { return "+=" + travel(); },
          pin: true, scrub: 0.7, anticipatePin: 1, invalidateOnRefresh: true
        }
      });
      galleryScroll = tween.scrollTrigger;
      return function () {
        galleryScroll = null;
        section.classList.remove("is-pinned");
        viewport.scrollLeft = 0;
      };
    });

    // Native horizontal scrolling remains available on mobile and without animation.
    $(".projects-window").on("keydown.portfolio", function (event) {
      if (!galleryScroll || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const trigger = galleryScroll;
      let destination = window.scrollY + (event.key === "ArrowRight" ? 420 : -420);
      if (event.key === "Home") destination = trigger.start;
      if (event.key === "End") destination = trigger.end;
      window.scrollTo({ top: gsap.utils.clamp(trigger.start, trigger.end, destination), behavior: "smooth" });
    });

    if (document.fonts) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    $(window).on("load.portfolio pageshow.portfolio", function () { ScrollTrigger.refresh(); });
  });
})(window.jQuery);
