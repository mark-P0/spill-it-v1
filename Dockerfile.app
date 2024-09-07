## Create base image that has PNPM
## https://pnpm.io/docker
## https://pnpm.io/installation
FROM node:lts-slim
RUN npm install --global pnpm

## Set base directory
WORKDIR /app

## Copy all files
COPY . .
