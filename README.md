# 📋 Reddit Sub Manager

> Mobile-first web app để quản lý danh sách Subreddit. Tối ưu cho iPhone.

![Mobile](https://img.shields.io/badge/Mobile-First-blue) ![Static](https://img.shields.io/badge/Static-HTML%2FJS-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- 📱 **Mobile-first UI** - Tối ưu cho iPhone 11 Pro Max
- 🎨 **Dark theme** - Dễ nhìn, không mỏi mắt
- 📊 **Card & Table view** - Chuyển đổi linh hoạt
- 📅 **Quick date picker** - Cập nhật ngày đăng nhanh
- 💬 **ChatGPT links** - Lưu link chat với mỗi sub
- 🏷️ **Categories** - Phân loại: Crypto, Karma, Fast Karma...
- 🔍 **Search & Sort** - Tìm kiếm, sắp xếp theo tên/ngày/subscribers
- 💾 **LocalStorage** - Tự động lưu, không cần backend
- 📥 **Export Markdown** - Xuất file backup

## 🚀 Demo

**Live:** [https://johnnytradingdev.github.io/reddit-sub-manager/](https://johnnytradingdev.github.io/reddit-sub-manager/)

## 📱 Screenshots

| Card View | Table View |
|-----------|------------|
| Compact cards with all info | One row per sub, sortable |

## 🛠️ Tech Stack

- **HTML5** - Structure
- **CSS3** - Modern dark theme, no framework
- **Vanilla JS** - No dependencies
- **LocalStorage** - Data persistence

## 📦 Installation

### Option 1: GitHub Pages (Free)
1. Fork this repo
2. Go to Settings → Pages
3. Deploy from `main` branch
4. Access at `https://[username].github.io/reddit-sub-manager/`

### Option 2: Local
```bash
git clone https://github.com/JohnnyTradingDev/reddit-sub-manager.git
cd reddit-sub-manager
# Open index.html in browser
```

### Option 3: VPS (Nginx)
```bash
# Copy files to server
scp -r ./* user@server:/var/www/reddit/

# Nginx config
server {
    listen 80;
    root /var/www/reddit;
    index index.html;
}
```

## 📖 Usage

1. **Add Sub**: Tap ➕ button
2. **Edit**: Tap ✏️ on any card
3. **Update Date**: Tap "Cập nhật" → Quick select
4. **Switch View**: Tap ☰/▦ in header
5. **Filter**: Use category tabs or search
6. **Export**: Menu → Export

## 🔧 Data Structure

```javascript
{
  id: 1,
  url: "https://reddit.com/r/CryptoCurrency/",
  type: "All",
  subscribers: "8.4M",
  nature: "Strict",
  category: "crypto",
  lastPosted: "2024-02-04",
  chatGPT: "https://chatgpt.com/c/..."
}
```

## 📝 Categories

| Category | Description |
|----------|-------------|
| 💰 Crypto | Crypto-related subs |
| 🌏 Asian | Regional crypto subs |
| ⭐ Karma | High-karma subs for building |
| 🚀 Fast Karma | Zero karma requirement |

## 🤝 Contributing

1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push & create PR

## 📄 License

MIT License - Free to use and modify.

---

Made with ❤️ for Reddit marketers
