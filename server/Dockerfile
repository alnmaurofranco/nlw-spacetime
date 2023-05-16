FROM node:lts-alpine

ARG BACKEND_WORKING_DIR=usr/backend

ENV BACKEND_WORKING_DIR=${BACKEND_WORKING_DIR}

RUN mkdir -p /$BACKEND_WORKING_DIR;

WORKDIR /$BACKEND_WORKING_DIR

COPY package.json pnpm-lock.yaml ./

RUN RUN npm i -g npm@latest; \
  npm install -g pnpm; \
  pnpm --version; \
  pnpm setup; \
  mkdir -p /usr/local/share/pnpm &&\
  export PNPM_HOME="/usr/local/share/pnpm" &&\
  export PATH="$PNPM_HOME:$PATH"; \
  pnpm bin -g &&\
  pnpm install

COPY . .

EXPOSE 3333

CMD [ "pnpm", "start:dev" ]
