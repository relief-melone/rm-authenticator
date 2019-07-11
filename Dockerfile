FROM node:10-alpine
USER root

COPY . .
WORKDIR /app
RUN npm --version && node --version

RUN npm install
RUN ./node_modules/.bin/tsc --watch false

EXPOSE 8081

CMD ["npm", "start"]