FROM node:14.18.0-buster AS builder

RUN mkdir -p /app
WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

FROM nginx:stable

RUN mkdir -p /var/www/site
WORKDIR /var/www/site

COPY --from=builder /app/dist .

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
