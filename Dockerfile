from node:14

RUN apt-get update && apt-get install -y \
  build-essential \
  python3

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]