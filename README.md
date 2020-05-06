# How to install

### `yarn`
run คำสั่ง `yarn` เพื่อลง dependencies

### `yarn start`
run คำสั่ง `yarn start` เพื่อ Runs web app ใน development mode
เปิด URL `http://localhost:3000/` บน browser

# Docker Development Mode

### `yarn compose:dev`
run คำสั่ง `yarn compose:dev` เพื่อ Runs web app ใน development mode บน Docker container
ปิด URL `http://localhost:3000/` บน browser

# Docker & Nginx

### ตั้งชื่อ host เพื่อกำหนด domain `guys.sub.test`
- runs `sudo nano /private/etc/hosts` ใน terminal
- เพิ่ม `127.0.0.1  guys.sub.test` ในบรรทัดล่างสุด
- save ไฟล์

### `yarn compose:prod`
- run คำสั่ง `yarn compose:prod` เพื่อ Runs web app บน Docker container ที่มี Nginx พร้อมกับทำ reverse proxy เพื่อสร้าง Domain `guys.sub.test`
- เปิด URL `guys.sub.test` บน browser


