(function () {
  function el(sel) { return document.querySelector(sel); }
  function elAll(sel) { return Array.from(document.querySelectorAll(sel)); }

  function buildTable(sinif) {
    const tbody = document.createElement("tbody");
    for (let h = 1; h <= DISREP_TOPLAM_HAFTA; h++) {
      if (disrepHaftaSecenekliMi(sinif, h)) {
        [1, 2].forEach((secenek) => {
          const links = disrepLinkleriOlustur(sinif, h, secenek);
          tbody.appendChild(buildRow(h, links, secenek));
        });
      } else {
        const links = disrepLinkleriOlustur(sinif, h, 1);
        tbody.appendChild(buildRow(h, links, null));
      }
    }
    return tbody;
  }

  function buildRow(hafta, links, secenek) {
    const tr = document.createElement("tr");
    const haftaTd = document.createElement("td");
    haftaTd.className = "hafta-cell";
    const haftaBaslik = document.createElement("div");
    haftaBaslik.textContent = `${hafta}. Hafta`;
    if (secenek) {
      const tag = document.createElement("span");
      tag.className = "opt-tag";
      tag.textContent = ` (Seçenek ${secenek})`;
      haftaBaslik.appendChild(tag);
    }
    const tarihDiv = document.createElement("div");
    tarihDiv.className = "hafta-tarih";
    tarihDiv.textContent = disrepHaftaTarihUzun(hafta, true);
    haftaTd.appendChild(haftaBaslik);
    haftaTd.appendChild(tarihDiv);
    const linkTd = document.createElement("td");
    const a1 = document.createElement("a");
    a1.href = links.online; a1.target = "_blank"; a1.rel = "noopener"; a1.textContent = "🔗 Etkinliğe Katıl";
    const a2 = document.createElement("a");
    a2.href = links.docx; a2.target = "_blank"; a2.rel = "noopener"; a2.textContent = "📄 Word İndir";
    linkTd.appendChild(a1);
    linkTd.appendChild(a2);
    tr.appendChild(haftaTd);
    tr.appendChild(linkTd);
    return tr;
  }

  function showSinif(sinif) {
    elAll(".grade-tab").forEach((t) => t.classList.toggle("active", Number(t.dataset.sinif) === sinif));
    const table = el("#refTable");
    const oldBody = table.querySelector("tbody");
    if (oldBody) oldBody.remove();
    table.appendChild(buildTable(sinif));
    localStorage.setItem("disrep_son_sinif", String(sinif));
  }

  document.addEventListener("DOMContentLoaded", () => {
    elAll(".grade-tab").forEach((tab) => {
      tab.addEventListener("click", () => showSinif(Number(tab.dataset.sinif)));
    });
    const sonSinif = Number(localStorage.getItem("disrep_son_sinif"));
    showSinif(DISREP_SINIFLAR.includes(sonSinif) ? sonSinif : 5);
  });
})();
