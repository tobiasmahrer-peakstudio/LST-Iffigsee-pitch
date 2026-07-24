document.querySelectorAll(".reel-card").forEach((card) => {
  const video = card.querySelector("[data-video]");
  const bgFill = card.querySelector(".bg-fill");
  const playBadge = card.querySelector("[data-play]");
  const soundBtn = card.querySelector("[data-sound]");

  video.addEventListener("play", () => {
    playBadge.classList.add("hidden");
    if (bgFill) bgFill.play().catch(() => {});
  });
  video.addEventListener("pause", () => {
    playBadge.classList.remove("hidden");
    if (bgFill) bgFill.pause();
  });

  playBadge.addEventListener("click", () => video.play());

  video.addEventListener("click", () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  soundBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    video.muted = !video.muted;
    soundBtn.textContent = video.muted ? "🔇" : "🔊";
  });

  video.addEventListener("ended", () => {
    video.currentTime = 0;
    video.play();
  });

  if (bgFill) {
    bgFill.addEventListener("timeupdate", () => {
      if (Math.abs(bgFill.currentTime - video.currentTime) > 0.4) {
        bgFill.currentTime = video.currentTime;
      }
    });
  }
});

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target.querySelector("[data-video]");
      const bgFill = entry.target.querySelector(".bg-fill");
      if (!video) return;
      if (entry.isIntersecting) {
        video.play().catch(() => {});
        if (bgFill) bgFill.play().catch(() => {});
      } else {
        video.pause();
        if (bgFill) bgFill.pause();
      }
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll(".reel-card").forEach((card) => io.observe(card));
