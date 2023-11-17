# Pull Official Base Image
FROM node:lts

# Set Working Directory
WORKDIR /app

# Install sqlite3
RUN apt-get install -y sqlite3

# Install pnpm
RUN apt-get update
RUN npm install -g pnpm

# Files required by pnpm install
# pnpm fetch only requires lock file
COPY pnpm-lock.yaml ./
RUN pnpm fetch

ADD . ./
RUN pnpm install -r
CMD ["pnpm", "start"]
