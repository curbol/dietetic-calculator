FROM node:lts-alpine as build
WORKDIR /usr/src
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:lts-alpine as serve
WORKDIR /usr/src
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
COPY --from=builder /usr/src/package* ./
RUN npm install --production
COPY --from=builder /usr/src/.nuxt/dist ./.nuxt/dist
EXPOSE 3000
CMD npm run start
