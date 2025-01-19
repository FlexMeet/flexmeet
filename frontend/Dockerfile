FROM node:latest

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

# Expose the development server port
EXPOSE 3000

# Run the development server (to be changed for production build)
CMD ["npm", "run", "dev"]
