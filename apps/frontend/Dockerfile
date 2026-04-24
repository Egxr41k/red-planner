# Use official Node.js 20 image
FROM node:22-alpine AS builder

WORKDIR /app
# Copy only package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app and build it
COPY . .
RUN npm run build

# Production image
FROM node:22-alpine

WORKDIR /app

# Copy only required output from build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]