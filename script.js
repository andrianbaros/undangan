const openBtn = document.getElementById("openBtn");
const cover = document.getElementById("cover");
const content = document.getElementById("content");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

/* ── OPEN INVITATION ─────────────────────── */
openBtn.addEventListener("click", async () => {
  cover.classList.add("hidden");
  content.classList.remove("hidden");

  try {
    music.volume = 0.55;
    await music.play();
  } catch (e) {
    // Autoplay blocked — user can use the music button
  }

  initReveal();
  updateCounter();
  renderComments();
});

/* ── MUSIC TOGGLE ───────────────────────── */
let playing = true;

musicBtn.addEventListener("click", async () => {
  if (playing) {
    music.pause();
    musicBtn.querySelector(".music-icon").textContent = "♪";
    musicBtn.querySelector(".music-label").textContent = "Muzik Off";
    musicBtn.classList.add("muted");
  } else {
    await music.play();
    musicBtn.querySelector(".music-icon").textContent = "♪";
    musicBtn.querySelector(".music-label").textContent = "Musik";
    musicBtn.classList.remove("muted");
  }
  playing = !playing;
});

/* ── COUNTER ────────────────────────────── */
function updateCounter() {
  const start = new Date("2025-06-13T00:00:00");
  const now = new Date();
  const days = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  const el = document.getElementById("counter");

  // Animate count-up
  let current = 0;
  const step = Math.ceil(days / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, days);
    el.textContent = current.toLocaleString("id-ID");
    if (current >= days) clearInterval(timer);
  }, 16);
}

/* ── SCROLL REVEAL ──────────────────────── */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger each card slightly
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* ── COMMENTS ───────────────────────────── */
function addComment() {
  const nameEl = document.getElementById("name");
  const commentEl = document.getElementById("comment");
  const name = nameEl.value.trim();
  const text = commentEl.value.trim();

  if (!name || !text) {
    // Shake the empty field
    const empty = !name ? nameEl : commentEl;
    empty.style.borderColor = "#d4627a";
    empty.style.animation = "none";
    setTimeout(() => {
      empty.style.borderColor = "";
    }, 1500);
    return;
  }

  const data = JSON.parse(localStorage.getItem("comments_baros_sabila")) || [];
  data.push({ name, text, ts: Date.now() });
  localStorage.setItem("comments_baros_sabila", JSON.stringify(data));

  nameEl.value = "";
  commentEl.value = "";
  renderComments();
}

function renderComments() {
  const list = document.getElementById("commentList");
  const data = JSON.parse(localStorage.getItem("comments_baros_sabila")) || [];

  if (!data.length) {
    list.innerHTML = `<p style="font-size:.8rem;color:var(--text-muted);font-style:italic;text-align:center;padding:12px 0">Belum ada komentar. Jadilah yang pertama. ✦</p>`;
    return;
  }

  list.innerHTML = data
    .slice()
    .reverse()
    .map(
      (c) => `
      <div class="comment-entry">
        <strong>${escapeHTML(c.name)}</strong>
        <p>${escapeHTML(c.text)}</p>
      </div>`
    )
    .join("");
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ── EASTER EGG ─────────────────────────── */
document.body.addEventListener("dblclick", () => {
  alert("Kalau nemu ini berarti kamu perhatian. 🫶");
});
