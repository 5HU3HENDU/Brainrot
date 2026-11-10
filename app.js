// Brainrot — Netflix-style shelf for tech / business / design documentaries.
// All playback is YouTube embeds. My List lives in localStorage. No login, no server.

const $ = (s) => document.querySelector(s);
const byId = (id) => FILMS.find((f) => f.id === id);
const MYLIST_KEY = "brainrot-mylist-v1";

let myList = new Set(JSON.parse(localStorage.getItem(MYLIST_KEY) || "[]"));
let durFilter = "all"; // all | u15 | m15_30 | p30
let query = "";
let myListView = false;

function saveList() {
  localStorage.setItem(MYLIST_KEY, JSON.stringify([...myList]));
}

function durLabel(min) {
  if (min >= 60) {
    const h = Math.floor(min / 60), m = min % 60;
    return m ? h + "h " + m + "m" : h + "h";
  }
  return min + " min";
}

function thumb(id, big) {
  return "https://i.ytimg.com/vi/" + id + "/" + (big ? "maxresdefault" : "hqdefault") + ".jpg";
}

function matches(f) {
  if (durFilter === "u15" && f.min >= 15) return false;
  if (durFilter === "m15_30" && (f.min < 15 || f.min > 30)) return false;
  if (durFilter === "p30" && f.min <= 30) return false;
  if (query) {
    const q = query.toLowerCase();
    if (!(f.title + " " + f.channel).toLowerCase().includes(q)) return false;
  }
  return true;
}

function cardHtml(f) {
  return (
    '<article class="card" data-id="' + f.id + '">' +
      '<div class="thumb"><img loading="lazy" src="' + thumb(f.id) + '" alt="">' +
      '<span class="dur">' + durLabel(f.min) + '</span></div>' +
      '<div class="body"><h3>' + esc(f.title) + '</h3>' +
      '<div class="sub">' + esc(f.channel) + '</div>' +
      '<span class="tag">' + f.cat + '</span></div>' +
    '</article>'
  );
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function rowHtml(title, films) {
  if (!films.length) return "";
  return (
    '<section class="row"><h2>' + title + '</h2><div class="scroller">' +
    films.map(cardHtml).join("") +
    "</div></section>"
  );
}

function renderHero() {
  const f = byId(FEATURED_ID);
  const inList = myList.has(f.id);
  $("#hero").innerHTML =
    '<img class="bg" src="' + thumb(f.id, true) + '" onerror="this.onerror=null;this.src=\'' + thumb(f.id) + '\'" alt="">' +
    '<div class="shade"></div>' +
    '<div class="info"><div class="kicker">FEATURED FILM</div>' +
    "<h1>" + esc(f.title) + "</h1>" +
    '<div class="meta">' + esc(f.channel) + " · " + durLabel(f.min) + " · " + f.cat + "</div>" +
    "<p>" + esc(f.note) + "</p>" +
    '<div class="actions">' +
    '<button class="btn-play" data-play="' + f.id + '">▶ Play</button>' +
    '<button class="btn-list" data-list="' + f.id + '">' + (inList ? "✓ In My List" : "+ My List") + "</button>" +
    "</div></div>";
}

function render() {
  renderHero();
  const list = FILMS.filter(matches);
  let html = "";
  if (!myListView) {
    const startHere = START_HERE.map(byId).filter((f) => f && matches(f));
    const myListFilms = [...myList].map(byId).filter((f) => f && matches(f));
    html += rowHtml("My List", myListFilms);
    html += rowHtml("Start here", startHere);
    html += rowHtml("Tech", list.filter((f) => f.cat === "Tech"));
    html += rowHtml("Business", list.filter((f) => f.cat === "Business"));
    html += rowHtml("Design", list.filter((f) => f.cat === "Design"));
    html += rowHtml("Quick watches · under 15 min", list.filter((f) => f.min < 15));
    html += rowHtml("Deep dives · 30+ min", list.filter((f) => f.min > 30));
    if (!html) html = '<p class="empty">Nothing matches. Try a different search or filter.</p>';
    $("#rows").innerHTML = html;
    $("#rows").style.display = "";
    $("#mylistView").style.display = "none";
  } else {
    const saved = [...myList].map(byId).filter((f) => f && matches(f));
    $("#mylistView").innerHTML =
      "<h2>My List</h2>" +
      (saved.length
        ? '<div class="grid">' + saved.map(cardHtml).join("") + "</div>"
        : '<p class="empty">Nothing saved yet. Tap + My List on any film and it will live here.</p>');
    $("#rows").style.display = "none";
    $("#mylistView").style.display = "";
  }
  $("#mylistBtn").classList.toggle("on", myListView);
  $("#mylistBtn").textContent = myListView ? "← Browse" : "My List" + (myList.size ? " (" + myList.size + ")" : "");
}

function toggleList(id) {
  if (myList.has(id)) myList.delete(id);
  else myList.add(id);
  saveList();
  render();
}

function openPlayer(id) {
  const f = byId(id);
  const inList = myList.has(id);
  $("#playerBody").innerHTML =
    "<h2>" + esc(f.title) + "</h2>" +
    '<div class="meta">' + esc(f.channel) + " · " + durLabel(f.min) + " · " + f.cat + "</div>" +
    "<p>" + esc(f.note) + "</p>" +
    '<div class="actions">' +
    '<button class="btn-list" data-list="' + f.id + '">' + (inList ? "✓ In My List" : "+ My List") + "</button>" +
    "</div>";
  $("#playerFrame").src =
    "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0&modestbranding=1";
  $("#player").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closePlayer() {
  $("#playerFrame").src = "";
  $("#player").classList.remove("open");
  document.body.style.overflow = "";
}

// Events (delegation — rows re-render often).
document.addEventListener("click", (e) => {
  const play = e.target.closest("[data-play]");
  if (play) { openPlayer(play.dataset.play); return; }
  const listBtn = e.target.closest("[data-list]");
  if (listBtn) {
    toggleList(listBtn.dataset.list);
    if (listBtn.closest("#player")) listBtn.textContent = myList.has(listBtn.dataset.list) ? "✓ In My List" : "+ My List";
    return;
  }
  const card = e.target.closest(".card");
  if (card) { openPlayer(card.dataset.id); return; }
});
$("#player").addEventListener("click", (e) => {
  if (e.target === $("#player")) closePlayer();
});
$("#playerClose").onclick = closePlayer;
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePlayer();
});
$("#search").addEventListener("input", (e) => {
  query = e.target.value.trim();
  render();
});
document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("on"));
    chip.classList.add("on");
    durFilter = chip.dataset.dur;
    render();
  });
});
$("#mylistBtn").addEventListener("click", () => {
  myListView = !myListView;
  render();
  window.scrollTo({ top: 0 });
});

render();
