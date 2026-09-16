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

/* =========================================================================
   Hafta tarihleri — 2026-2027 Eğitim ve Öğretim Yılı Çalışma Takvimi'ne göre
   hesaplandı. Ders yılı 14 Eylül 2026 Pazartesi'de başlıyor, 1. hafta ilk
   okul haftası kabul edilip Ara Tatil (16-20 Kasım 2026), Yarıyıl Tatili
   (25 Ocak - 05 Şubat 2027) ve 2. Ara Tatil (08-12 Mart 2027) atlanarak
   ardışık 36 okul haftası sayıldı. Doğrulama: bu sayımda 18. hafta tam
   "1. Dönemin Sona Ermesi" (22 Ocak 2027 Cuma) ile, 19. hafta ise tam
   "2. Yarıyıl Başlangıcı" (08 Şubat 2027 Pazartesi) ile örtüşüyor — bu da
   hesabın doğru olduğunu teyit ediyor. Ayın son haftası (21-25 Haziran 2027)
   36 haftaya dahil edilmedi (dönem sonu/kapanış haftası olarak serbest kaldı).
   Format: [başlangıçGün, başlangıçAy(0=Ocak), başlangıçYıl, bitişGün, bitişAy, bitişYıl]
   ========================================================================= */
const DISREP_AY_ADLARI = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];

const DISREP_HAFTA_TARIHLERI = [
  [14,8,2026, 18,8,2026],
  [21,8,2026, 25,8,2026],
  [28,8,2026, 2,9,2026],
  [5,9,2026, 9,9,2026],
  [12,9,2026, 16,9,2026],
  [19,9,2026, 23,9,2026],
  [26,9,2026, 30,9,2026],
  [2,10,2026, 6,10,2026],
  [9,10,2026, 13,10,2026],
  [23,10,2026, 27,10,2026],
  [30,10,2026, 4,11,2026],
  [7,11,2026, 11,11,2026],
  [14,11,2026, 18,11,2026],
  [21,11,2026, 25,11,2026],
  [28,11,2026, 1,0,2027],
  [4,0,2027, 8,0,2027],
  [11,0,2027, 15,0,2027],
  [18,0,2027, 22,0,2027],
  [8,1,2027, 12,1,2027],
  [15,1,2027, 19,1,2027],
  [22,1,2027, 26,1,2027],
  [1,2,2027, 5,2,2027],
  [15,2,2027, 19,2,2027],
  [22,2,2027, 26,2,2027],
  [29,2,2027, 2,3,2027],
  [5,3,2027, 9,3,2027],
  [12,3,2027, 16,3,2027],
  [19,3,2027, 23,3,2027],
  [26,3,2027, 30,3,2027],
  [3,4,2027, 7,4,2027],
  [10,4,2027, 14,4,2027],
  [17,4,2027, 21,4,2027],
  [24,4,2027, 28,4,2027],
  [31,4,2027, 4,5,2027],
  [7,5,2027, 11,5,2027],
  [14,5,2027, 18,5,2027],
];

// Uzun format: "14 Eylül - 18 Eylül" (yilGoster true ise sona yil eklenir)
function disrepHaftaTarihUzun(hafta, yilGoster) {
  const t = DISREP_HAFTA_TARIHLERI[hafta - 1];
  if (!t) return "";
  const [sg, sa, , bg, ba, by] = t;
  const baslangic = `${sg} ${DISREP_AY_ADLARI[sa]}`;
  const bitis = `${bg} ${DISREP_AY_ADLARI[ba]}${yilGoster ? " " + by : ""}`;
  return `${baslangic} - ${bitis}`;
}

// Kısa format (hafta ızgarası gibi dar alanlar için): "14-18 Eyl" ya da ay değişiyorsa "28 Ara-1 Oca"
function disrepHaftaTarihKisa(hafta) {
  const t = DISREP_HAFTA_TARIHLERI[hafta - 1];
  if (!t) return "";
  const [sg, sa, , bg, ba] = t;
  if (sa === ba) return `${sg}-${bg} ${DISREP_AY_ADLARI[sa].slice(0, 3)}`;
  return `${sg} ${DISREP_AY_ADLARI[sa].slice(0, 3)}-${bg} ${DISREP_AY_ADLARI[ba].slice(0, 3)}`;
}
