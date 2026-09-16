/* =========================================================================
   DİSREP Etkinlik Linkleri — veri ve URL üretici
   Kaynak: https://orgm.meb.gov.tr/disrep/ortaokuletkinlik.html
   Desen doğrulandı: 5, 6, 7 sınıf sayfaları elle kontrol edildi (2026-09).
   ========================================================================= */

const DISREP_SINIFLAR = [5, 6, 7, 8];
const DISREP_TOPLAM_HAFTA = 36;

// Seçenekli (alternatifli) haftalar — bu haftalarda "Seçenek 1" (ek yok) ve
// "Seçenek 2" (.1 eki) olmak üzere iki ayrı etkinlik bulunuyor.
const DISREP_SECENEKLI = {
  5: [19, 20, 28],
  6: [7, 19, 21],
  7: [3, 4, 5, 6],
  8: [13, 35],
};

function disrepHaftaSecenekliMi(sinif, hafta) {
  const liste = DISREP_SECENEKLI[sinif] || [];
  return liste.includes(hafta);
}

// secenek: 1 veya 2 (sadece seçenekli haftalarda anlamlı; diğerlerinde yok sayılır)
function disrepLinkleriOlustur(sinif, hafta, secenek) {
  let suffix = "";
  if (disrepHaftaSecenekliMi(sinif, hafta) && secenek === 2) {
    suffix = ".1";
  }
  const taban = `https://orgm.meb.gov.tr/disrep/etk/${sinif}-${hafta}${suffix}`;
  return {
    online: `${taban}/index.html`,
    docx: `${taban}.docx`,
  };
}
