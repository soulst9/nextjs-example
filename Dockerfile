FROM node:20-bullseye-slim AS build

RUN mkdir -p /src
RUN mkdir -p /opt/log
RUN mkdir -p /data

WORKDIR /src

COPY package.json /src
COPY yarn.lock /src

# RUN apt clean
RUN apt update && apt install -y net-tools python3 build-essential

RUN which yarn || npm install -g yarn
RUN yarn global add pm2
RUN yarn install --frozen-lockfile

COPY . /src

RUN chmod +x /src/docker-entrypoint.sh
ENTRYPOINT ["/bin/bash", "/src/docker-entrypoint.sh"]

EXPOSE 14000
