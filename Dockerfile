FROM node:20-alpine
# ↑ Base image: Node.js v20 on Alpine Linux (small, ~50MB vs ~900MB for full)

WORKDIR /app
# ↑ Create /app folder inside container and cd into it
# All following commands run from /app

COPY package*.json ./
# ↑ Copy package.json and package-lock.json (if exists) to /app

RUN npm install
# ↑ Install dependencies defined in package.json

COPY . .
# ↑ Copy all source code to /app

RUN npm run build
# ↑ Runs tsc → compiles TypeScript to JavaScript in dist/

RUN npm prune --production
# ↑ Removes devDependencies (typescript, nodemon, ts-node, @types/*)
# Keeps only production dependencies (express, mongoose, jsonwebtoken)
# Makes final image smaller

EXPOSE 3000
# ↑ Expose port 3000 for the app

CMD ["node", "dist/Server.js"]