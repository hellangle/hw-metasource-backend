# Common build stage
FROM node:16.16.0-alpine as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage

RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT [ "docker-entrypoint.sh" ]

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

# RUN npm install -g pm2

ENV NODE_ENV production

CMD ["npm", "run", "start"]
