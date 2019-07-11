FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install --global nodemon
RUN npm install

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
