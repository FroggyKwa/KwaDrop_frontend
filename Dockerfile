FROM node:16.15.1-alpine
WORKDIR /kwadrop-frontend

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
CMD ["npm", "run", "serve"]
