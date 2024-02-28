ARG NODE_VERSION=20-alpine3.19

FROM node:${NODE_VERSION}

LABEL name="mern-invoice"
LABEL license="MIT"
LABEL description="MERN invoice image"

ENV NODE_ENV=development

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

# best practice: add new system group and user intead of using root user
RUN addgroup --system invoice \
  && adduser --system --ingroup invoice invoice


COPY package*.json ./

RUN npm install


COPY --chown=invoice:invoice . ${APP_HOME}

# chown [new_owner]:[new_group] [file/directory]
RUN chown invoice:invoice ${APP_HOME}


# switch to new user created
USER invoice

CMD ["npm", "run", "dev"]