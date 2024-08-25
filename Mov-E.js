document.addEventListener("DOMContentLoaded", function () {
  // Select the heading with the data attribute `data-animate-heading`
  const headings = document.querySelectorAll('[data-animate-heading="true"]');
  const nav = document.querySelector('[data-nav-animate="true"]');
  const heroContent = document.querySelector(
    '[data-herocontent-animate="true"]'
  );

  headings.forEach((heading) => {
    // Split the heading text into words or characters
    const splitText = new SplitType(heading, { types: "words, chars" });

    // Create a GSAP timeline for sequencing the animations
    const timeline = gsap.timeline();

    // Initially hide the hero content (paragraph and button group)
    gsap.set(heroContent, { y: 60, opacity: 0 });

    // Animate the heading characters
    timeline.from(splitText.words, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
    });

    // Animate the navigation when half of the heading animation is complete
    timeline.to(
      nav,
      {
        y: 0, // Moves the nav down to its original position
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=30%"
    ); // This offsets the start of the nav animation by half of the heading animation duration

    // Animate the hero content (paragraph and button group) simultaneously with the heading animation
    timeline.to(
      heroContent,
      {
        y: 0, // Slide the content up to its original position
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=90%"
    );

    // Initially hide the nav off the top of the screen
    gsap.set(nav, { y: -100, opacity: 0 });
  });
  // Second section scroll-triggered animation
  const secondSectionHeading = document.querySelector(
    '[data-animate-heading="second"]'
  );

  if (secondSectionHeading) {
    // Split the heading text into words or characters
    const splitText = new SplitType(secondSectionHeading, {
      types: "words, chars",
    });

    // Scroll-triggered animation
    gsap.from(splitText.words, {
      scrollTrigger: {
        trigger: secondSectionHeading, // Element that triggers the animation
        start: "top 50%", // When the top of the heading reaches 80% of the viewport height
        end: "top 20%", // Animation ends when the top of the heading reaches 20% of the viewport height
        toggleActions: "play none none none", // Play the animation when it enters, no reverse or repeat
      },
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
    });

    // Select all elements with the attribute data-animate-heading="third"
    const thirdSectionHeadings = document.querySelectorAll(
      '[data-animate-heading="third"]'
    );

    // Loop through each element and create an individual ScrollTrigger
    thirdSectionHeadings.forEach((heading) => {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading, // Each element triggers its own animation
          start: "top 60%", // Adjust the start position as needed
          end: "top 20%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
      });
    });

    const overlays = document.querySelectorAll('[overlay="true"]');
    // Loop through each element and create an individual ScrollTrigger
    overlays.forEach((overlay) => {
      gsap.to(overlay, {
        scrollTrigger: {
          trigger: overlay, // Each element triggers its own animation
          start: "top 60%", // Adjust the start position as needed
          end: "top 20%",
          toggleActions: "play none none none",
        },
        y: "-100%",
        duration: 1.2,
        ease: "power2.inOut",
      });
    });

    // GSAP ScrollTrigger Parallax Effect
    gsap.to('[parallax="true"]', {
      yPercent: 20, // Image moves slower than content
      ease: "none", // No easing for a smooth parallax effect
      scrollTrigger: {
        trigger: '[parallax-trigger="true"]', // The section to trigger the effect
        start: "top bottom", // Trigger when the top of the section hits the bottom of the viewport
        end: "bottom top", // End when the bottom of the section hits the top of the viewport
        scrub: true, // Smoothly animate the parallax effect as the user scrolls
      },
    });
  }
});

