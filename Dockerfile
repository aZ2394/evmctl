FROM node:latest

RUN mkdir -p /usr/src/evmctl
WORKDIR /usr/src/evmctl

COPY package*.json /usr/src/evmctl
RUN npm install

COPY . /usr/src/evmctl
