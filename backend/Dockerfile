
FROM node:16-alpine

# DOCKER DOESN'T LIKE NODE_ENV=production
#   IT ONLY LIKES NODE_ENV=prod
ENV NODE_ENV=prod

# WORKDIR /app
WORKDIR /

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 4000

# RUN yarn tsc

# CMD [ "yarn", "start"]
CMD yarn tsc; yarn start:deploy