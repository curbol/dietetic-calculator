FROM node:lts-alpine

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install
RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

ENV CALC_API_HTTP=prodHttp
ENV CALC_API_WS=prodWs

EXPOSE 3000
CMD [ "npm", "start" ]
