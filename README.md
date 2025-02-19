# 👟 Shoe Store E-Commerce Application

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş bir online ayakkabı mağazası uygulamasıdır.

## 🚀 Özellikler

- 🏠 Anasayfa ürün listesi
- 🔍 Detaylı ürün görüntüleme
- 📂 Kategori bazlı ürün filtreleme
- 🔐 Kullanıcı kimlik doğrulama sistemi

## 🛠 Teknolojiler

### Frontend
- ⚛️ React.js
- 🚦 React Router
- 🎨 CSS

### Backend
- 🖥️ Node.js
- 🚀 Express.js
- 🗄️ MongoDB
- 🔑 JSON Web Token (Kimlik doğrulama için)

## 💻 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/mustafanalbant1/Shoe-Store.git
```

### Backend için
```bash
cd server
npm install
```

### Frontend için
```bash
cd client
npm install
```

### Çevresel değişkenler (.env)
```ini
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### Backend sunucusunu başlatma
```bash
cd server
npm start
```

### Frontend geliştirme sunucusunu başlatma
```bash
cd client
npm run dev
```

## 🌐 Endpoints   

### Ürünler
- `GET /api/products` - Tüm ürünleri listeler
- `GET /api/products/:id` - Belirli bir ürünün detaylarını getirir
- `GET /api/products/category/:categoryName` - Kategori bazlı ürünleri listeler

### Kullanıcılar
- `POST /api/users/register` - Yeni kullanıcı kaydı
- `POST /api/users/login` - Kullanıcı girişi

## 👥 Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir özellik dalı oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Dalınıza push yapın (`git push origin feature/AmazingFeature`)
5. Bir Pull Request oluşturun

## 📝 Lisans

Bu proje [MIT](LICENSE) lisansı altında lisanslanmıştır.

## 📧 İletişim

[İsminiz] - [E-posta adresiniz]

🔗 **Proje Linki:** [Shoe Store GitHub](https://github.com/mustafanalbant1/Shoe-Store)

