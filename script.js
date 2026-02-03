const openBtn = document.getElementById("openBtn");
const cover = document.getElementById("cover");
const content = document.getElementById("content");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

openBtn.onclick = () => {
  cover.classList.add("hidden");
  content.classList.remove("hidden");
  music.play();
};

/* MUSIC TOGGLE */
let playing = true;
musicBtn.onclick = () => {
  if (playing) {
    music.pause();
    musicBtn.textContent = "🔇 Musik";
  } else {
    music.play();
    musicBtn.textContent = "🎵 Musik";
  }
  playing = !playing;
};

/* COUNTER */
const start = new Date("2025-06-13");
const now = new Date();
const days = Math.floor((now - start) / (1000 * 60 * 60 * 24));
document.getElementById("counter").textContent = `${days} hari bersama`;

/* KOMENTAR */
function addComment() {
  const name = document.getElementById("name").value;
  const text = document.getElementById("comment").value;
  if (!name || !text) return;

  const data = JSON.parse(localStorage.getItem("comments")) || [];
  data.push({ name, text });
  localStorage.setItem("comments", JSON.stringify(data));

  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
  renderComments();
}

function renderComments() {
  const list = document.getElementById("commentList");
  list.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("comments")) || [];

  data.forEach((c) => {
    list.innerHTML += `
      <div class="bg-slate-700 p-3 rounded">
        <b>${c.name}</b><br>
        <span class="text-sm opacity-90">${c.text}</span>
      </div>
    `;
  });
}

renderComments();
