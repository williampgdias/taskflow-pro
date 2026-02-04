FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

RUN npm install

# Copy the rest of the code
COPY . .

# Next.js development port
EXPOSE 3000

CMD ["npm", "run", "dev"]