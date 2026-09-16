# DİSREP Etkinlik Linkleri

MEB'in Dijital Sınıf Rehberlik Etkinlikleri (DİSREP) sayfalarındaki 5, 6, 7 ve 8.
sınıf × 36 hafta etkinlik bağlantılarını tek bir araçta toplayan, öğretmenlerin
okul internetinden/akıllı tahtadan hızlıca erişmesi için hazırlanmış statik web
aracı. **Doldurulabilir bir form değildir** — sadece doğru bağlantıya hızlı
yönlendirme sağlar.

**Site:** (Netlify'a bağlandıktan sonra eklenecek)
**Kaynak:** https://orgm.meb.gov.tr/disrep/ortaokuletkinlik.html

## Dosya Yapısı

```
disrep-etkinlik/
├── index.html        — Hızlı erişim paneli: sınıf + hafta (+ seçenek) seç → linkler
├── tablo.html         — 4 sınıf × 36 hafta tüm bağlantıların tablosu (sekmeli)
├── assets/
│   ├── style.css       — Ortak stil (navy/Georgia — diğer kitlerle aynı görsel dil)
│   ├── data.js          — Sınıf/hafta verisi ve URL üretici (tek kaynak, iki sayfa da kullanır)
│   ├── app.js            — index.html etkileşim mantığı
│   └── tablo.js            — tablo.html etkileşim mantığı
└── netlify.toml
```

## URL Deseni

```
Online (Etkinliğe Katıl): https://orgm.meb.gov.tr/disrep/etk/{sinif}-{hafta}{suffix}/index.html
Word (Etkinlik Planı):    https://orgm.meb.gov.tr/disrep/etk/{sinif}-{hafta}{suffix}.docx
```

- `{sinif}` = 5, 6, 7, 8
- `{hafta}` = 1–36
- `{suffix}` = normal haftalarda boş; **seçenekli** haftalarda Seçenek 1 için boş, Seçenek 2 için `.1`

### Seçenekli (alternatifli) haftalar

| Sınıf | Seçenekli haftalar |
|---|---|
| 5 | 19, 20, 28 |
| 6 | 7, 19, 21 |
| 7 | 3, 4, 5, 6 |
| 8 | 13, 35 |

Bu desen, 5. ve 7. sınıf sayfaları (`orgm.meb.gov.tr/disrep/5sinif.html`,
`.../7sinif.html`) elle kontrol edilerek doğrulanmıştır (2026-09).

## Tasarım Notları

- Öğretmen/akıllı tahta kullanımı için **büyük, dokunmatik dostu** butonlar
  (küçük form alanları yerine).
- Kişisel veri toplanmaz; yalnızca "son seçilen sınıf" kolaylık olsun diye
  `localStorage`'da (bu cihazda) tutulur, sunucuya hiçbir şey gönderilmez.
- Diğer kitlerle (idari-belge-sablonlari, kumkale-yaptirim-kiti) aynı görsel
  dil: navy `#1F3864`, Georgia (başlık) + Arial (gövde), amber not kutusu.
