<script src="https://unpkg.com/split-type"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.23/bundled/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Flip.min.js"></script>

<script>
  let lenis;

  if (Webflow.env("editor") === undefined) {
    function updateLenisHeight() {
      document.body.style.height = 'auto'; // Reset to auto to recalculate
      const bodyHeight = document.body.scrollHeight;
      document.body.style.height = bodyHeight + 'px'; // Set new height
    }

    lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.7,
      gestureOrientation: "vertical",
      normalizeWheel: false,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Update height on Lenis start and stop
    lenis.on('scroll', updateLenisHeight);
    updateLenisHeight(); // Initial call
    window.addEventListener('resize', updateLenisHeight); // Update on resize
  }

  $("[data-lenis-start]").on("click", function () {
    lenis.start();
    updateLenisHeight();
  });

  $("[data-lenis-stop]").on("click", function () {
    lenis.stop();
  });

  $("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
      lenis.stop();
    } else {
      lenis.start();
      updateLenisHeight();
    }
  });
</script>

<script>
$(document).ready(function() {
    $('#Slider div:nth-child(2)').trigger('tap');
});
</script>

<script>
window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play()
    });
  }
  
  $("[words-slide-up-hero]").each(function (index) {
    gsap.from($(this).find(".word"), { opacity: 0, yPercent: 100, duration: 1.2, ease: "expo.out", stagger: { amount: 0.3 } });
  });
  
  $("[words-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), { opacity: 0, yPercent: 100, duration: 1.2, ease: "expo.out", stagger: { amount: 0.3 } });
    createScrollTrigger($(this), tl);
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});
</script>

<script>
$(".nav_wrap").each(function () {
  let hamburgerEl = $(this).find(".menulink-hover-wrapper");
  let navcontainEl = $(this).find(".nav_contain-wrapper");
  let navLineEl = $(this).find(".nav_hamburger_line");
  let menuContainEl = $(this).find(".menu_contain");
  let flipItemEl = $(this).find(".nav_hamburger_base");
  let menuWrapEl = $(this).find(".menu_wrap");
  let menuBaseEl = $(this).find(".menu_base");
  let menuLinkEl = $(this).find(".navmenu_link-wrapper");
  

  let flipDuration = 0.3;

  function flip(forwards) {
    let state = Flip.getState(flipItemEl);
    if (forwards) {
      flipItemEl.appendTo(menuContainEl);
    } else {
      flipItemEl.appendTo(navcontainEl);
    }
    Flip.from(state, { duration: flipDuration });
  }

  let tl = gsap.timeline({ paused: true });
  tl.set(menuWrapEl, { display: "flex" });
  tl.from(menuBaseEl, {
    opacity: 0,
    duration: flipDuration,
    ease: "none",
    onStart: () => {
      flip(true);
    }
  });
  tl.from(menuLinkEl, {
    opacity: 0,
    yPercent: 50,
    duration: 0.2,
    stagger: { amount: 0.2 },
    onReverseComplete: () => {
      flip(false);
    }
  });

  function openMenu(open) {
    if (!tl.isActive()) {
      if (open) {
        tl.play();
        hamburgerEl.addClass("nav-open");
      } else {
        tl.reverse();
        hamburgerEl.removeClass("nav-open");
      }
    }
  }

  hamburgerEl.on("click", function () {
    if ($(this).hasClass("nav-open")) {
      openMenu(false);
    } else {
      openMenu(true);
    }
   });
   menuLinkEl.on("click", function () {
    openMenu(false);
  });
});
</script>

