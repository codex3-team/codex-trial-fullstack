FROM node:14

WORKDIR /usr/src/app

ADD server .

RUN npm i

CMD ["node", "index.js"]
