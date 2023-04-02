FROM node:16.15.1-alpine

WORKDIR /var/www/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "./server.js"]
