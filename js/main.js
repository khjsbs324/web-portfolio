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
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.from(".hero-picture", { opacity: 0, y: 24, duration: 1.8 })
        .from(".hero-branch", { opacity: 0, y: 32, duration: 1.8 }, .15)
        .from(".hero-label", { opacity: 0, y: 18, duration: 1.4 }, .55)
        .from(".hero-label p", { opacity: 0, y: 8, duration: 1.1, stagger: .12 }, .8);
      gsap.to(".hero-flower", {
        y: 40, rotation: 3, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.6 }
      });

      $(".profile-person, .profile-copy > .headline, .detail").each(function () {
        gsap.set(this, { autoAlpha: 0, y: 28 });
        gsap.to(this, {
          autoAlpha: 1, y: 0, duration: 1.15, ease: "power3.out",
          scrollTrigger: { trigger: this, start: "top 90%", once: true }
        });
      });

      gsap.fromTo(".project-card", { autoAlpha: 0, y: 32 }, {
        autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.16, ease: "power3.out",
        scrollTrigger: { trigger: ".projects", start: "top 90%", once: true }
      });

      // Keep complete phrases available to assistive technology.
      const phrases = [...document.querySelectorAll(".closing-headline > span")];
      const originals = phrases.map(function (phrase) { return phrase.textContent; });
      phrases.forEach(function (phrase, index) {
        phrase.setAttribute("aria-label", originals[index]);
        phrase.textContent = "";
        Array.from(originals[index]).forEach(function (character) {
          const letter = document.createElement("span");
          letter.className = "closing-char";
          letter.setAttribute("aria-hidden", "true");
          letter.textContent = character;
          phrase.appendChild(letter);
        });
      });
      const farewell = gsap.timeline({
        scrollTrigger: { trigger: ".closing", start: "top 85%", once: true }
      });
      farewell.from(".closing-char", {
        opacity: 0, y: 13, filter: "blur(5px)", duration: 1.6,
        stagger: .055, ease: "power2.out"
      }, .15).from(".closing-branch img", {
        opacity: 0, y: 32, rotation: -2, duration: 2.6, ease: "sine.out"
      }, 0);
      return function () {
        phrases.forEach(function (phrase, index) {
          phrase.textContent = originals[index];
          phrase.removeAttribute("aria-label");
        });
      };
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
