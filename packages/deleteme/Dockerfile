# Create base image that has PNPM
# https://pnpm.io/docker
FROM node:lts-slim AS pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install only package production dependencies
# https://github.com/pnpm/pnpm/issues/6300
# https://github.com/pnpm/pnpm/releases/tag/v9.5.0
WORKDIR /spill-it-v1
COPY . .
RUN pnpm --filter=deleteme install --prod

# Run productin command
# CMD [  ]
