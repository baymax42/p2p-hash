FROM node:latest

VOLUME ["/app"]
WORKDIR /app

RUN ls -l
RUN npm install
EXPOSE 8000

CMD ["npm", "run", "server"]
