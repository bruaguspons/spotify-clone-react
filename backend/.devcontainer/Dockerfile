FROM node:20.9.0-alpine3.18 AS base

ENV DIR /code
WORKDIR ${DIR}


##############################
###       DEVELOPMENT      ###
##############################
FROM base AS dev

ENV NODE_ENV=development

# COPY package*.json ${DIR}

COPY . .

RUN npm install
# RUN npm run migrate:dev

# COPY tsconfig*.json ${DIR}
# COPY src ${DIR}/src

EXPOSE ${PORT}

USER ${USER}

CMD [ "npm", "run", "dev" ]


##############################
###       PRODUCTION       ###
##############################
FROM base AS build

RUN apk update && apk add --no-cache dumb-init

COPY package*.json ${DIR}

RUN npm ci

COPY tsconfig*.json ${DIR}
COPY src ${DIR}/src

RUN npm run build && npm prune --production


FROM base AS production

ENV USER node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
# COPY --from=build ${DIR}/node_modules ${DIR}/node_modules
COPY --from=build ${DIR}/dist ${DIR}/dist

ENV NODE_ENV=production
EXPOSE ${PORT}

USER ${USER}

CMD [ "dumb-init", "node", "dist/index.js" ]