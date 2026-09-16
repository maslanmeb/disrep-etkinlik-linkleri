(function () {
  const STORAGE_KEY = "disrep_son_sinif";

  let state = { sinif: null, hafta: null, secenek: null };

  function el(sel) { return document.querySelector(sel); }
  function elAll(sel) { return Array.from(document.querySelectorAll(sel)); }

  function buildWeekGrid() {
    const grid = el("#weekGrid");
    grid.innerHTML = "";
    for (let h = 1; h <= DISREP_TOPLAM_HAFTA; h++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "week-btn";
      btn.title = disrepHaftaTarihUzun(h, true);
      btn.innerHTML = `<span class="week-num">${h}</span><span class="week-date">${disrepHaftaTarihKisa(h)}</span>`;
      if (state.sinif && disrepHaftaSecenekliMi(state.sinif, h)) {
        btn.classList.add("has-option");
      }
      btn.addEventListener("click", () => selectHafta(h));
      grid.appendChild(btn);
    }
  }

  function selectSinif(sinif) {
    state.sinif = sinif;
    state.hafta = null;
    state.secenek = null;
    localStorage.setItem(STORAGE_KEY, String(sinif));

    elAll(".big-btn").forEach((b) => b.classList.toggle("active", Number(b.dataset.sinif) === sinif));
    el("#stepHafta").classList.remove("disabled");
    el("#stepSecenek").style.display = "none";
    el("#stepSonuc").style.display = "none";
    buildWeekGrid();
  }

  function selectHafta(hafta) {
    state.hafta = hafta;
    state.secenek = null;
    elAll(".week-btn").forEach((b, i) => b.classList.toggle("active", i + 1 === hafta));

    if (disrepHaftaSecenekliMi(state.sinif, hafta)) {
      el("#stepSecenek").style.display = "block";
      elAll(".option-btn").forEach((b) => b.classList.remove("active"));
      el("#stepSonuc").style.display = "none";
    } else {
      el("#stepSecenek").style.display = "none";
      state.secenek = 1;
      showSonuc();
    }
  }

  function selectSecenek(secenek) {
    state.secenek = secenek;
    elAll(".option-btn").forEach((b) => b.classList.toggle("active", Number(b.dataset.secenek) === secenek));
    showSonuc();
  }

  function showSonuc() {
    const { sinif, hafta, secenek } = state;
    const links = disrepLinkleriOlustur(sinif, hafta, secenek);
    const secenekMetni = disrepHaftaSecenekliMi(sinif, hafta) ? ` — Seçenek ${secenek}` : "";
    el("#sonucBaslik").textContent = `${sinif}. Sınıf — ${hafta}. Hafta${secenekMetni}`;
    el("#sonucTarih").textContent = disrepHaftaTarihUzun(hafta, true);
    el("#linkOnline").href = links.online;
    el("#linkDocx").href = links.docx;
    el("#stepSonuc").style.display = "block";
    el("#stepSonuc").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function reset() {
    state = { sinif: null, hafta: null, secenek: null };
    elAll(".big-btn").forEach((b) => b.classList.remove("active"));
    el("#stepHafta").classList.add("disabled");
    el("#weekGrid").innerHTML = "";
    el("#stepSecenek").style.display = "none";
    el("#stepSonuc").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.addEventListener("DOMContentLoaded", () => {
    elAll(".big-btn").forEach((btn) => {
      btn.addEventListener("click", () => selectSinif(Number(btn.dataset.sinif)));
    });
    elAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => selectSecenek(Number(btn.dataset.secenek)));
    });
    el("#resetBtn").addEventListener("click", reset);

    // Önceki ziyarette seçilen sınıfı hatırla (sadece kolaylık için; kişisel
    // veri değildir, sunucuya hiçbir şey gönderilmez).
    const sonSinif = Number(localStorage.getItem(STORAGE_KEY));
    if (sonSinif && DISREP_SINIFLAR.includes(sonSinif)) {
      selectSinif(sonSinif);
    }
  });
})();
