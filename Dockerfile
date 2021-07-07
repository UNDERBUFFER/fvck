FROM node:10.22.0

COPY . /app

WORKDIR /app

RUN npm install

CMD npm start