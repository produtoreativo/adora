FROM node:17-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV HOME /usr/src/app
WORKDIR $HOME
COPY ["package.json", "yarn.lock", "$HOME/"]
RUN yarn install
COPY . $HOME
CMD ["node", "dist/src/main"]