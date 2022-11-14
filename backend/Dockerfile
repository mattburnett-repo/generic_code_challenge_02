
FROM node:16-alpine

# DOCKER DOESN'T LIKE NODE_ENV=production
#   IT ONLY LIKES NODE_ENV=prod
ENV NODE_ENV=prod

# WORKDIR /app
WORKDIR /

COPY package.json ./

# do installs
# NOTE: do the TS compilation outside of the container build / dock comp up
#   ie: yarn tsc, before running dock comp up
#   https://stackoverflow.com/a/60916422/16824901

RUN yarn

COPY . .

EXPOSE 4000

CMD yarn start:docker
