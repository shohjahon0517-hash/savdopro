# Savdo Pro

Savdo Pro - bu do'konlar uchun POS (Point of Sale) tizimi. Loyiha quyidagi funksiyalarni o'z ichiga oladi:

- Mahsulotlar boshqaruvi
- Sotuv va checkout
- Chek yaratish
- Telegram bot orqali sotuv xabarlari
- QR va Barcode support
- Admin login / auth
- React frontend va Express backend

## Boshlash

```bash
npm install
cp .env.example .env
npm run dev
```

Frontendni alohida ishga tushirish uchun:

```bash
npm run client
```

## Strukturasi

```bash
server/
  config/
  middleware/
  models/
  routes/
  services/
client/
```

## Muhim

MongoDB server localhost:27017 da ishlashi kerak.
