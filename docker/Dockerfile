# -------- BUILD --------
FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# -------- RUNTIME --------
FROM nginx:alpine

COPY --from=builder /app/dist /var/www/public
