# React Native Trello Klonu (Clerk & Supabase ile)

Bu proje, kullanıcı kimlik doğrulaması için **Clerk**, tüm backend mantığı için **Supabase** kullanan bir React Native Trello klonudur.

## Ekstra Özellikler:

- [x] **Expo Router** dosya tabanlı navigasyon
- [x] **Supabase Storage** ile dosya depolama
- [x] **Zeego** ile yerel menüler
- [x] **Bottom Sheet** bileşeni için alt sayfa (bottom sheet) bileşeni
- [x] **Reanimated Carousel** ile karusel bileşeni
- [x] **Draggable Flatlist** ile sürükle-bırak listeler
- [ ] **Supabase Edge Functions** ile push bildirimleri
- [ ] **Supabase Realtime** ile gerçek zamanlı veritabanı güncellemeleri

## Kurulum

Proje local kurulum için aşağıdaki adımları takip edebilirsiniz:

1. **Depoyu klonlayın:**

   ```bash
   git clone https://github.com/muhammedalikaya/trelloClone
   cd trelloClone
   ```

2. **Bağımlılıkları yükleyin:**

   ```bash
   npm install
   npx expo install
   ```

3. **Clerk ve Supabase ayarlarını yapılandırın:**

   - Clerk ve Supabase hesaplarınızı oluşturun.
   - Supabase URL'si, Anahtarlar ve Clerk API anahtarlarını `.env` dosyanıza ekleyin.

4. **Uygulamayı başlatın:**
   ```bash
   npx expo run:ios
   ```

## Kullanılan Teknolojiler

- **React Native:** Mobil uygulamalar için ana çerçeve.
- **Clerk:** Kullanıcı kimlik doğrulama ve yönetimi.
- **Supabase:** Backend hizmeti, veritabanı ve dosya depolama.
- **Expo:** React Native uygulamaları için geliştirme platformu.
- **Reanimated:** Animasyonlar için gelişmiş kütüphane.
- **Zeego:** Native menüler için eklenti.
- **Bottom Sheet:** Alt sayfa bileşeni için.

## Katkıda Bulunma

Projeye katkıda bulunmak isterseniz aşağıdaki adımları takip edin:

1. Depoyu fork'layın
2. Yeni bir dal oluşturun (`git checkout -b yeni-ozellik`)
3. Değişikliklerinizi commit'leyin (`git commit -m 'Yeni özellik ekle'`)
4. Dalınızı push'layın (`git push origin yeni-ozellik`)
5. Bir **Pull Request** açın
