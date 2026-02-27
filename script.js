/* ═══════════════════════════════════════════════
   BAROS & SABILA — ENHANCED SCRIPT
   Libraries: GSAP + ScrollTrigger, AOS, Typed.js, Vanilla Tilt
═══════════════════════════════════════════════ */

// ─── Register GSAP plugins ───────────────────
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ═══════════════════════════════════════════════
   1. CUSTOM CURSOR
═══════════════════════════════════════════════ */
const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");

let mouseX = 0,
  mouseY = 0;
let ringX = 0,
  ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  gsap.to(cursorDot, {
    x: mouseX,
    y: mouseY,
    duration: 0.1,
    ease: "power2.out",
  });
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  gsap.set(cursorRing, { x: ringX, y: ringY });
  requestAnimationFrame(animateRing);
})();

document.addEventListener("mousedown", () => {
  gsap.to(cursorRing, { scale: 0.7, duration: 0.15 });
  gsap.to(cursorDot, { scale: 1.5, duration: 0.15 });
});
document.addEventListener("mouseup", () => {
  gsap.to(cursorRing, { scale: 1, duration: 0.3, ease: "elastic.out(1,0.5)" });
  gsap.to(cursorDot, { scale: 1, duration: 0.3, ease: "elastic.out(1,0.5)" });
});

/* ═══════════════════════════════════════════════
   2. STAR CANVAS
═══════════════════════════════════════════════ */
(function initStarCanvas() {
  const canvas = document.getElementById("starCanvas");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createStars(n) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2,
        alpha: Math.random(),
        speed: Math.random() * 0.005 + 0.002,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.016;

    stars.forEach((s) => {
      const alpha =
        0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.speed * 60 + s.twinkleOffset));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,213,170,${alpha * 0.6})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  resize();
  createStars(180);
  draw();
  window.addEventListener("resize", () => {
    resize();
    createStars(180);
  });
})();

/* ═══════════════════════════════════════════════
   3. FLOATING PETALS
═══════════════════════════════════════════════ */
(function spawnPetals() {
  const container = document.getElementById("petalsContainer");
  const symbols = ["✦", "◆", "✿", "·", "°", "•"];

  function spawn() {
    const el = document.createElement("div");
    el.className = "petal";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const size = Math.random() * 8 + 8;
    const left = Math.random() * 100;
    const dur = Math.random() * 12 + 10;
    const del = Math.random() * 5;

    el.style.cssText = `
      left: ${left}%;
      font-size: ${size}px;
      color: rgba(201,169,110,${Math.random() * 0.3 + 0.05});
      animation-duration: ${dur}s;
      animation-delay: ${del}s;
    `;

    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + del) * 1000);
  }

  spawn();
  setInterval(spawn, 1200);
})();

/* ═══════════════════════════════════════════════
   4. COVER ENTRANCE ANIMATION (GSAP)
═══════════════════════════════════════════════ */
gsap
  .timeline({ delay: 0.3 })
  .to("#cvBadge", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.0)
  .to("#cvTitle", { opacity: 1, duration: 1.0, ease: "power3.out" }, 0.3)
  .from("#nameLeft", { x: -60, duration: 1.0, ease: "power4.out" }, 0.3)
  .from("#nameRight", { x: 60, duration: 1.0, ease: "power4.out" }, 0.3)
  .from(
    "#cvAmp",
    { scale: 0.3, rotation: -20, duration: 0.9, ease: "elastic.out(1,0.5)" },
    0.6
  )
  .to("#cvDate", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.9)
  .to(
    "#cvTagline",
    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    1.1
  )
  .to("#cvDivider", { opacity: 1, duration: 0.6, ease: "power2.out" }, 1.3)
  .to("#openBtn", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 1.5)
  .to("#cvNote", { opacity: 1, duration: 0.6, ease: "power2.out" }, 1.7);

/* ═══════════════════════════════════════════════
   5. MAGNETIC BUTTONS
═══════════════════════════════════════════════ */
function initMagnetic() {
  document.querySelectorAll("[data-magnetic]").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = 0.35;
      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    });
  });
}

/* ═══════════════════════════════════════════════
   6. AUDIO
═══════════════════════════════════════════════ */
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
let isPlaying = false;

music.volume = 0.5;

musicBtn.addEventListener("click", async () => {
  if (isPlaying) {
    music.pause();
    musicBtn.classList.add("paused");
    musicBtn.querySelector(".music-label").textContent = "Off";
  } else {
    await music.play().catch(() => {});
    musicBtn.classList.remove("paused");
    musicBtn.querySelector(".music-label").textContent = "Musik";
  }
  isPlaying = !isPlaying;

  // Bounce animation
  gsap.fromTo(
    musicBtn,
    { scale: 0.9 },
    { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" }
  );
});

/* ═══════════════════════════════════════════════
   7. OPEN INVITATION
═══════════════════════════════════════════════ */
document.getElementById("openBtn").addEventListener("click", async () => {
  const cover = document.getElementById("cover");
  const content = document.getElementById("content");

  // Cover exit animation
  gsap.to(cover, {
    opacity: 0,
    scale: 1.04,
    duration: 0.9,
    ease: "power3.in",
    onComplete: () => {
      cover.classList.add("hidden");
      content.classList.remove("hidden");

      // Init everything after reveal
      AOS.init({
        duration: 800,
        easing: "ease-out-quart",
        once: true,
        offset: 60,
      });

      initScrollProgress();
      initCounter();
      initStatCircles();
      initTypedQuote();
      initParallax();
      initMagnetic();
      renderComments();
      spawnCounterHearts();

      // Play music
      music
        .play()
        .then(() => {
          isPlaying = true;
        })
        .catch(() => {});
    },
  });

  showToast("🤍 Selamat datang!");
});

/* ═══════════════════════════════════════════════
   8. SCROLL PROGRESS BAR
═══════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById("progressBar");
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min((scrolled / docHeight) * 100, 100);
    bar.style.width = pct + "%";
  });
}

/* ═══════════════════════════════════════════════
   9. COUNTER ANIMATION
═══════════════════════════════════════════════ */
function initCounter() {
  const start = new Date("2025-06-13T00:00:00");
  const now = new Date();
  const days = Math.floor((now - start) / 86400000);
  const el = document.getElementById("counter");

  ScrollTrigger.create({
    trigger: ".s-counter",
    start: "top 80%",
    once: true,
    onEnter: () => {
      gsap.to(
        { val: 0 },
        {
          val: days,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: function () {
            el.textContent = Math.floor(this.targets()[0].val).toLocaleString(
              "id-ID"
            );
          },
        }
      );
    },
  });
}

/* ═══════════════════════════════════════════════
   10. FLOATING HEARTS IN COUNTER
═══════════════════════════════════════════════ */
function spawnCounterHearts() {
  const container = document.getElementById("counterHearts");
  const hearts = ["🤍", "🩷", "✦", "◆"];
  hearts.forEach((h, i) => {
    const span = document.createElement("span");
    span.textContent = h;
    span.style.cssText = `
      display:inline-block; font-size:${i % 2 === 0 ? "10px" : "8px"};
      opacity:0.4; animation: heartBeat 3s ease-in-out infinite;
      animation-delay:${i * 0.5}s;
    `;
    container.appendChild(span);
  });

  const style = document.createElement("style");
  style.textContent = `
    @keyframes heartBeat {
      0%,100% { transform: scale(1); opacity:0.3; }
      50%      { transform: scale(1.3); opacity:0.7; }
    }
  `;
  document.head.appendChild(style);
}

/* ═══════════════════════════════════════════════
   11. SVG STAT CIRCLES
═══════════════════════════════════════════════ */
function initStatCircles() {
  const configs = [
    { id: "sc1", pct: 100, color: "#c9a96e" },
    { id: "sc2", pct: 100, color: "#d4627a" },
    { id: "sc3", pct: 77, color: "#8a8078" },
    { id: "sc4", pct: 3, color: "#c9a96e" },
  ];

  const circumference = 2 * Math.PI * 34; // r=34

  configs.forEach((cfg) => {
    const circle = document.getElementById(cfg.id);
    if (!circle) return;
    circle.style.stroke = cfg.color;
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    ScrollTrigger.create({
      trigger: ".stat-grid",
      start: "top 85%",
      once: true,
      onEnter: () => {
        const offset = circumference - (circumference * cfg.pct) / 100;
        gsap.to(circle, {
          strokeDashoffset: offset,
          duration: 1.6,
          ease: "power2.out",
          delay: Math.random() * 0.3,
        });
      },
    });
  });
}

/* ═══════════════════════════════════════════════
   12. TYPED.JS QUOTE
═══════════════════════════════════════════════ */
function initTypedQuote() {
  ScrollTrigger.create({
    trigger: ".s-quote",
    start: "top 80%",
    once: true,
    onEnter: () => {
      new Typed("#typedQuote", {
        strings: [
          "Hubungan ini akan bertahan selama komunikasi dijaga, ego diturunin, dan ^1000<em>Sabila terus ngasih makanan sisa ke Baros.</em>",
        ],
        typeSpeed: 28,
        showCursor: true,
        cursorChar: "▌",
        contentType: "html",
      });
    },
  });
}

/* ═══════════════════════════════════════════════
   13. GSAP PARALLAX
═══════════════════════════════════════════════ */
function initParallax() {
  // Photo parallax
  gsap.to(".photo-inner img", {
    yPercent: -8,
    ease: "none",
    scrollTrigger: {
      trigger: ".s-photo",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  // Hero title
  gsap.to(".hero-title", {
    yPercent: 25,
    ease: "none",
    scrollTrigger: {
      trigger: ".s-hero",
      start: "top top",
      end: "bottom top",
      scrub: 2,
    },
  });

  // Card glow drift
  gsap.utils.toArray(".card-glow").forEach((glow) => {
    gsap.to(glow, {
      x: "random(-30, 30)",
      y: "random(-30, 30)",
      duration: "random(4, 7)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  });
}

/* ═══════════════════════════════════════════════
   14. FAQ TOGGLE
═══════════════════════════════════════════════ */
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains("open");

  // Close all
  document
    .querySelectorAll(".faq-item.open")
    .forEach((i) => i.classList.remove("open"));

  if (!isOpen) {
    item.classList.add("open");
    gsap.from(item.querySelector(".faq-a p"), {
      opacity: 0,
      y: -6,
      duration: 0.3,
      ease: "power2.out",
    });
  }
}

/* ═══════════════════════════════════════════════
   15. COMMENTS
═══════════════════════════════════════════════ */
function addComment() {
  const nameEl = document.getElementById("name");
  const commentEl = document.getElementById("comment");
  const name = nameEl.value.trim();
  const text = commentEl.value.trim();

  if (!name || !text) {
    const target = !name ? nameEl : commentEl;
    gsap.fromTo(
      target,
      { x: -8 },
      {
        x: 0,
        duration: 0.4,
        ease: "elastic.out(1,0.3)",
        keyframes: { x: [-8, 8, -6, 6, -4, 0] },
      }
    );
    target.style.borderColor = "#d4627a";
    setTimeout(() => {
      target.style.borderColor = "";
    }, 1500);
    return;
  }

  const data = JSON.parse(localStorage.getItem("bs_comments_v2")) || [];
  data.push({ name, text, ts: Date.now() });
  localStorage.setItem("bs_comments_v2", JSON.stringify(data));

  nameEl.value = "";
  commentEl.value = "";

  showToast("✦ Terima kasih sudah mendoakan!");
  renderComments();
}

function renderComments() {
  const list = document.getElementById("commentList");
  const data = JSON.parse(localStorage.getItem("bs_comments_v2")) || [];

  if (!data.length) {
    list.innerHTML = `<p style="font-size:.78rem;color:var(--muted);font-style:italic;text-align:center;padding:16px 0">
      Belum ada komentar. Jadilah yang pertama. ✦
    </p>`;
    return;
  }

  list.innerHTML = data
    .slice()
    .reverse()
    .map(
      (c) => `
    <div class="comment-entry">
      <strong>${escape(c.name)}</strong>
      <p>${escape(c.text)}</p>
    </div>
  `
    )
    .join("");
}

function escape(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ═══════════════════════════════════════════════
   16. TOAST
═══════════════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

/* ═══════════════════════════════════════════════
   17. GSAP SCROLL EFFECTS (hero line, sections)
═══════════════════════════════════════════════ */
ScrollTrigger.create({
  trigger: ".hero-line",
  start: "top 90%",
  once: true,
  onEnter: () => {
    gsap.fromTo(
      ".hero-line",
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1.4,
        ease: "power3.out",
        transformOrigin: "left",
      }
    );
  },
});

// Card hover glow with GSAP
document.querySelectorAll(".glass-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  });
});

/* ═══════════════════════════════════════════════
   18. EASTER EGG — Konami code
═══════════════════════════════════════════════ */
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let ki = 0;
document.addEventListener("keydown", (e) => {
  if (e.keyCode === konami[ki]) {
    ki++;
    if (ki === konami.length) {
      ki = 0;
      showToast("🎉 Cheat code! Semoga langgeng terus ya!");
      confettiBurst();
    }
  } else {
    ki = 0;
  }
});

// Double-click easter egg
document.body.addEventListener("dblclick", () => {
  showToast("🫶 Kalau nemu ini, kamu perhatian banget.");
});

/* ═══════════════════════════════════════════════
   19. CONFETTI BURST (easter egg)
═══════════════════════════════════════════════ */
function confettiBurst() {
  const symbols = ["✦", "◆", "🤍", "✿", "·", "*"];
  const colors = ["#c9a96e", "#d4627a", "#e8d5aa", "#fff", "#4ade80"];

  for (let i = 0; i < 50; i++) {
    const el = document.createElement("div");
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.cssText = `
      position:fixed; z-index:9990; pointer-events:none;
      font-size:${Math.random() * 16 + 8}px;
      color:${colors[Math.floor(Math.random() * colors.length)]};
      left:${Math.random() * 100}vw;
      top:${Math.random() * 100}vh;
      opacity:1;
    `;
    document.body.appendChild(el);
    gsap.to(el, {
      y: (Math.random() - 0.5) * 400,
      x: (Math.random() - 0.5) * 300,
      rotation: Math.random() * 720 - 360,
      opacity: 0,
      duration: Math.random() * 2 + 1,
      ease: "power2.out",
      onComplete: () => el.remove(),
    });
  }
}

/* ═══════════════════════════════════════════════
   20. SCROLL-TRIGGERED CARD STAGGER (GSAP)
═══════════════════════════════════════════════ */
window.addEventListener("load", () => {
  gsap.utils.toArray(".s-card").forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.05,
          }
        );
      },
    });
  });
});
