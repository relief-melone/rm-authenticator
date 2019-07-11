FROM node:10-alpine
USER root

WORKDIR /app
COPY . .

RUN npm config set proxy $HTTP_PROXY && \
    npm config set https-proxy $HTTPS_PROXY && \
    npm --version && node --version

RUN npm install
RUN ./node_modules/.bin/tsc -p ./tsconfig.build.prod.json

EXPOSE 8080
EXPOSE 8081

CMD ["npm", "start"]