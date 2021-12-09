FROM node:16

USER node

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install nodemon

RUN npm install

ENV DEBUG=blogilista:*

CMD npm run dev-cont