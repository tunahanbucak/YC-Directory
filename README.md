# Ultimate Next.js Course - YC Directory

Bu proje, Ultimate Next.js kursu kapsamında geliştirilmiştir ve Next.js 15 ile modern bir web uygulaması oluşturmayı öğreten önemli bir kaynak niteliğindedir. Uygulama, Next.js'in temel özelliklerini kullanarak performans optimizasyonları ve SEO iyileştirmeleriyle birlikte kurumsal düzeyde bir uygulama geliştirmeyi hedeflemektedir.

Proje, **Sanity** API platformunu kullanarak içerik yönetimi ve yapısal veri entegrasyonu sağlamaktadır.

## Proje Özellikleri

- **Next.js 15'te Yeni Özellikler**: Yeni dosya yapısı, server ve client bileşenleri, API Routes, SEO optimizasyonları ve daha fazlası.
- **Sanity Entegrasyonu**: İçerik yönetimi için Sanity API kullanımı.
- **Authentication**: NextAuth kullanarak kullanıcı doğrulama işlemleri.
- **Veri Çekme Yöntemleri**: SSR (Server Side Rendering), SSG (Static Site Generation), ISR (Incremental Static Regeneration) ve PPR (Partial Pre-rendering) yöntemleri.
- **Performans İyileştirmeleri**: Next.js'in en iyi özellikleri ile uygulama performansı ve önbellekleme optimizasyonları.
- **Gerçek Zamanlı Arama**: URL sorgu parametreleri ile gerçek zamanlı arama özelliği.
- **Hata İzleme ve Performans Takibi**: Sentry ile uygulama hatalarını ve performansı izleme.

## Kurulum

1. **Proje İstemcisine GitHub'dan İndirin**

   ```bash
   git clone https://github.com/tunahanbucak/YC-Directory.git
   ```

2. **Gerekli Bağımlılıkları Yükleyin**

   Proje dizininde aşağıdaki komutu çalıştırarak gerekli bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

3. **Çevresel Değişkenler**

   `.env.local` dosyasını oluşturun ve aşağıdaki çevresel değişkenleri ekleyin:

   ```bash
   NEXTAUTH_URL=your_auth_url
   SANITY_PROJECT_ID=your_sanity_project_id
   SANITY_DATASET=your_sanity_dataset
   ```

4. **Uygulamayı Başlatın**

   Aşağıdaki komutu çalıştırarak uygulamayı başlatabilirsiniz:

   ```bash
   npm run dev
   ```

   Uygulama, `http://localhost:3000` adresinde çalışacaktır.

## Kullanılan Teknolojiler

- **Next.js 15**
- **Sanity.io**
- **NextAuth.js** (Authentication)
- **Sentry** (Hata Takibi)
- **React**
