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
COPY --from=builder /usr/src/.nuxt/dist ./.nuxt/dist
EXPOSE 3000
CMD npm run start
