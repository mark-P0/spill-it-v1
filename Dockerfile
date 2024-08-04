# Create base image that has PNPM
# https://pnpm.io/docker
FROM node:lts-slim AS pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install monorepo as a whole
FROM pnpm AS install
WORKDIR /spill-it-v1
COPY . .
RUN pnpm i

# "Deploy" individual packages into self-contained directories
# https://pnpm.io/cli/deploy
# FROM install AS deploy
RUN pnpm deploy --filter=api /spill-it-v1-deploy/api
RUN pnpm deploy --filter=deletme /spill-it-v1-deploy/deletme

# API only
FROM pnpm AS api
COPY --from=install /spill-it-v1-deploy/api /spill-it-v1-api