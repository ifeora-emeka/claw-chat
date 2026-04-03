FROM node:20-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/
COPY prisma/ ./prisma/
RUN pnpm install --frozen-lockfile
COPY . .
RUN npx prisma generate
RUN pnpm build
EXPOSE 8080
CMD ["pnpm", "start"]
