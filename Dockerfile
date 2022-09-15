FROM node:18.7.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["/bin/bash", "-c", "npm run build;npm run start"]