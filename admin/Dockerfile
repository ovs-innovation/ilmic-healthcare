# Build stage — Vite inlines VITE_* at build time (runtime env_file is ignored)
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Explicit production defaults (override via docker-compose build.args)
ARG VITE_APP_API_BASE_URL=https://api.ilmichealthcare.in/api
ARG VITE_APP_ADMIN_DOMAIN=https://admin.ilmichealthcare.in
ARG VITE_APP_ENCRYPT_PASSWORD=llmic_admin_encrypt_2026
ARG VITE_APP_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/uo7tuk2x/image/upload
ARG VITE_APP_CLOUDINARY_UPLOAD_PRESET=ilmic_healthcare_upload
ARG VITE_APP_CLOUD_NAME=uo7tuk2x
ARG VITE_APP_CLOUDINARY_CLOUD_NAME=uo7tuk2x

# Highest priority for Vite — overrides any leftover env files
ENV VITE_APP_API_BASE_URL=$VITE_APP_API_BASE_URL \
    VITE_APP_ADMIN_DOMAIN=$VITE_APP_ADMIN_DOMAIN \
    VITE_APP_ENCRYPT_PASSWORD=$VITE_APP_ENCRYPT_PASSWORD \
    VITE_APP_CLOUDINARY_URL=$VITE_APP_CLOUDINARY_URL \
    VITE_APP_CLOUDINARY_UPLOAD_PRESET=$VITE_APP_CLOUDINARY_UPLOAD_PRESET \
    VITE_APP_CLOUD_NAME=$VITE_APP_CLOUD_NAME \
    VITE_APP_CLOUDINARY_CLOUD_NAME=$VITE_APP_CLOUDINARY_CLOUD_NAME \
    NODE_ENV=production

RUN npm run build

# Fail the image build if mixed-content / old IP URLs were baked into assets
RUN set -e; \
    if grep -R "72.0.111.212" /app/dist; then echo "ERROR: old server IP found in bundle" >&2; exit 1; fi; \
    if grep -RE "http://[^\"']*:3096" /app/dist; then echo "ERROR: http://*:3096 found in bundle" >&2; exit 1; fi; \
    if ! grep -R "https://api.ilmichealthcare.in/api" /app/dist >/dev/null; then \
      echo "ERROR: production API URL missing from build output" >&2; exit 1; \
    fi; \
    echo "Bundle API URL check passed"

# Production stage
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
