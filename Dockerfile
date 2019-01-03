FROM resin/raspberry-pi-alpine-node:8
WORKDIR /src/
EXPOSE 4000
COPY . .
RUN npm install && mkdir system
ENTRYPOINT ["node", "server.js"]