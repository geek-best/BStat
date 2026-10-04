// API publique (non officielle) de Brawl Stars. À modifier si tu utilises un autre jeu/API.
const API_URL = "https://api.brawlapi.com/v1/players/";

const form = document.getElementById("form");
const tagInput = document.getElementById("tag");
const result = document.getElementById("result");
const nameEl = document.getElementById("name");
const trophiesEl = document.getElementById("trophies");
const errorEl = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  result.hidden = true;
  errorEl.hidden = true;

  // Nettoie le tag : majuscules, sans espaces ni "#"
  const tag = tagInput.value.trim().toUpperCase().replace(/^#/, "");
  if (!tag) return;

  try {
    const res = await fetch(API_URL + encodeURIComponent("#" + tag));
    if (!res.ok) throw new Error(res.status === 404 ? "Joueur introuvable." : "Erreur de l'API (" + res.status + ").");
    const data = await res.json();

    nameEl.textContent = data.name;
    trophiesEl.textContent = Number(data.trophies).toLocaleString("fr-FR");
    result.hidden = false;
  } catch (err) {
    errorEl.textContent = err.message || "Impossible de contacter l'API.";
    errorEl.hidden = false;
  }
});
