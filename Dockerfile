FROM node:19-alpine3.15
RUN apk update
WORKDIR /app
COPY . /app/
RUN npm ci
EXPOSE 5050
CMD ["node", "index.js"]