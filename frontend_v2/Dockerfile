FROM node:current-alpine3.21

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
