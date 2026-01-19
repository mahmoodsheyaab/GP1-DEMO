# تشغيل الباك إند فقط (نأخذ dist جاهزة من خارج Docker)
FROM python:3.11-slim

WORKDIR /app

# تثبيت متطلبات بايثون
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# نسخ app.py
COPY app.py .

# نسخ ملفات الواجهة المبنية (dist) من سياق الـ build
COPY dist ./dist

EXPOSE 8080

CMD ["python", "app.py"]
