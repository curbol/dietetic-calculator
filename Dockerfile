FROM node:lts-alpine as builder
WORKDIR /usr/src
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:lts-alpine as serve
WORKDIR /usr/src
COPY --from=builder /usr/src/package* ./
RUN npm install --prod
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
COPY --from=builder /usr/src/.nuxt/dist ./.nuxt/dist
ENV CALC_API_HTTP=prodHttp
ENV CALC_API_WS=prodWs
EXPOSE 3000
CMD npm run start
