# Bước 1: Sử dụng một image Node.js chính thức để build ứng dụng
FROM node:16-alpine as build-stage

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép các tệp tin package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng Vue 3
RUN npm run build

# Bước 2: Sử dụng image Nginx để phục vụ ứng dụng đã build
FROM nginx:alpine as production-stage

# Sao chép các file build từ bước trước vào thư mục Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Mở cổng 80 cho truy cập HTTP
EXPOSE 80

# Khởi chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
