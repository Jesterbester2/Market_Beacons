FROM node:8

RUN mkdir -p /usr/src/app/server


WORKDIR /usr/src/app/server

COPY /nodemon.json /usr/src/app/server

COPY /package.json /usr/src/app/server

RUN node -v

RUN npm install

COPY . /usr/src/app/server

EXPOSE 3000

CMD ["npm", "start"]
