FROM node:12-slim
USER root

WORKDIR /app
COPY . .
RUN npm --version && node --version

RUN npm install
RUN npm run build

EXPOSE 8081

CMD ["npm", "start"]