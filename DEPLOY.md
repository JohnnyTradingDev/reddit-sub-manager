# 🚀 Hướng dẫn Deploy Reddit Sub Manager

## 📁 Cấu trúc project
```
reddit-sub-list/
├── index.html
├── styles.css
├── data.js
├── app.js
└── DEPLOY.md (file này)
```

---

## 🌐 Cách 1: GitHub Pages (MIỄN PHÍ - Khuyến nghị)

### Bước 1: Tạo GitHub Repository
1. Đăng nhập GitHub: https://github.com
2. Click **"New repository"** (nút + góc trên phải)
3. Đặt tên: `reddit-sub-manager`
4. Chọn **Public**
5. Click **Create repository**

### Bước 2: Push code lên GitHub
Mở terminal tại folder `reddit-sub-list` và chạy:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/reddit-sub-manager.git
git push -u origin main
```

> Thay `YOUR_USERNAME` bằng username GitHub của bạn

### Bước 3: Bật GitHub Pages
1. Vào Settings của repository
2. Scroll xuống **Pages** (sidebar bên trái)
3. Source: chọn **Deploy from a branch**
4. Branch: chọn **main** / **root**
5. Click **Save**

### Bước 4: Truy cập
Sau 1-2 phút, app sẽ online tại:
```
https://YOUR_USERNAME.github.io/reddit-sub-manager/
```

---

## 🖥️ Cách 2: VPS Ubuntu (HTTP)

### Bước 1: Cài đặt Nginx
```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Bước 2: Upload files
```bash
# Tạo folder cho app
sudo mkdir -p /var/www/reddit-manager

# Copy files vào (từ local qua SCP)
# Chạy lệnh này trên máy Windows của bạn:
scp -r d:/Code/1_Active/reddit-sub-list/* user@YOUR_VPS_IP:/var/www/reddit-manager/
```

Hoặc tạo files trực tiếp trên VPS:
```bash
cd /var/www/reddit-manager
nano index.html  # paste nội dung file
nano styles.css
nano data.js
nano app.js
```

### Bước 3: Cấu hình Nginx
```bash
sudo nano /etc/nginx/sites-available/reddit-manager
```

Paste nội dung sau:
```nginx
server {
    listen 80;
    server_name YOUR_VPS_IP;  # hoặc domain của bạn
    
    root /var/www/reddit-manager;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

### Bước 4: Kích hoạt site
```bash
sudo ln -s /etc/nginx/sites-available/reddit-manager /etc/nginx/sites-enabled/
sudo nginx -t  # test config
sudo systemctl reload nginx
```

### Bước 5: Mở port firewall
```bash
sudo ufw allow 80
```

### Bước 6: Truy cập
```
http://YOUR_VPS_IP/
```

---

## 📱 Sử dụng trên iPhone

### Thêm vào Home Screen (như app)
1. Mở link trong Safari
2. Tap nút **Share** (hình vuông có mũi tên lên)
3. Chọn **"Add to Home Screen"**
4. Đặt tên và tap **Add**

App sẽ mở fullscreen như native app! 🎉

---

## ⚠️ Lưu ý quan trọng

### Data được lưu ở đâu?
- Data lưu trong **localStorage** của browser
- Nếu xóa cache browser → mất data
- Mỗi thiết bị có data riêng (không sync)

### Backup data
1. Vào app → Menu → **Export Markdown**
2. File `.md` sẽ được tải về
3. Lưu file này để backup

### Sync giữa các thiết bị
Nếu cần sync, bạn sẽ cần:
- Thêm backend (Firebase, Supabase...)
- Hoặc sử dụng cloud storage

---

## 🔧 Troubleshooting

### App không load?
- Kiểm tra console (F12 → Console) xem có lỗi gì
- Đảm bảo 4 files đều có mặt

### GitHub Pages 404?
- Đợi 2-3 phút sau khi enable
- Kiểm tra branch name (main vs master)
- Đảm bảo có file `index.html` ở root

### Nginx không hoạt động?
```bash
sudo nginx -t          # test config
sudo tail -f /var/log/nginx/error.log  # xem error log
```
