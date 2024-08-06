# syntax=docker.io/docker/dockerfile:1

# Build stage: includes resources necessary for installing dependencies
FROM node:20.8.0-bookworm AS build-stage

# Set working directory inside the container
WORKDIR /opt/cartesi/dapp

# Copy application files to the container
COPY . .

# Install dependencies and build the application
RUN yarn install && yarn build

# Runtime stage: produces final image that will be executed
FROM --platform=linux/riscv64 cartesi/node:20.8.0-jammy-slim

# Version of Cartesi Machine Emulator Tools
ARG MACHINE_EMULATOR_TOOLS_VERSION=0.14.1

# Add and install Cartesi Machine Emulator Tools
ADD https://github.com/cartesi/machine-emulator-tools/releases/download/v${MACHINE_EMULATOR_TOOLS_VERSION}/machine-emulator-tools-v${MACHINE_EMULATOR_TOOLS_VERSION}.deb /
RUN dpkg -i /machine-emulator-tools-v${MACHINE_EMULATOR_TOOLS_VERSION}.deb \
  && rm /machine-emulator-tools-v${MACHINE_EMULATOR_TOOLS_VERSION}.deb

# Metadata labels for Cartesi SDK version and RAM size
LABEL io.cartesi.rollups.sdk_version=0.9.0
LABEL io.cartesi.rollups.ram_size=128Mi

# Install required packages and clean up
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  busybox-static=1:1.30.1-7ubuntu3 \
  && rm -rf /var/lib/apt/lists/* /var/log/* /var/cache/*
RUN useradd --create-home --user-group dapp

# Add Cartesi binaries to PATH
ENV PATH="/opt/cartesi/bin:${PATH}"

# Set working directory for runtime stage
WORKDIR /opt/cartesi/dapp

# Copy built application from build stage
COPY --from=build-stage /opt/cartesi/dapp/dist .

# Set environment variable for Rollup HTTP server URL
ENV ROLLUP_HTTP_SERVER_URL="http://127.0.0.1:5004"

# Initialize and start the Cartesi rollup
ENTRYPOINT ["rollup-init"]
CMD ["node", "index.js"]
