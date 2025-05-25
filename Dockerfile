FROM node:18

WORKDIR /Calculator

# Copy package files first to leverage Docker caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]