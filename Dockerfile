FROM node:12

WORKDIR /app
COPY . . 

RUN npm install && \
    npm run build && \
    bash ./scripts/setDevFilePermissions.sh

EXPOSE 8080
EXPOSE 9229

ENTRYPOINT [ "/bin/bash", "./scripts/start.sh" ]