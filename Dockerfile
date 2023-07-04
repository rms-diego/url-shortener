FROM node:alpine3.18

WORKDIR /app

COPY . .

RUN npm install

RUN chmod 777 start.sh

EXPOSE 3000

ENTRYPOINT ["sh", "start.sh" ]
