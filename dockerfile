FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env.production .env.production

RUN npm run build

# Servir frontend
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
