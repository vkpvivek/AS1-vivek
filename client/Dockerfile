# Base image
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Important fix: expose dev server to host machine
CMD ["npm", "run", "dev", "--", "--host"]
