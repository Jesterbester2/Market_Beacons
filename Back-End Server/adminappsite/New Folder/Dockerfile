FROM mhart/alpine-node:8

RUN mkdir -p /usr/src/app/client


WORKDIR /usr/src/app/client

COPY /package.json /usr/src/app/client

RUN npm install

COPY . /usr/src/app/client

EXPOSE 4200 49153

CMD ["npm", "start"]
