# مرحلة بناء الواجهة
FROM node:20-alpine AS frontend-build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# مرحلة تشغيل الباك إند
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .
COPY --from=frontend-build /app/dist ./dist

EXPOSE 8080

CMD ["python", "app.py"]
