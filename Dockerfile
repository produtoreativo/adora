FROM public.ecr.aws/lambda/nodejs:18 As development

WORKDIR /usr/src/app
COPY package*.json ./
# RUN npm ci
RUN npm i -g yarn
RUN yarn install --frozen-lockfile
COPY  . .


FROM public.ecr.aws/lambda/nodejs:18 As build

WORKDIR /usr/src/app
COPY  package*.json ./
COPY  --from=development /usr/src/app/node_modules ./node_modules
COPY . .
# RUN npm run build
RUN npm i -g yarn
RUN yarn build
ENV NODE_ENV production
# RUN npm ci --only=production && npm cache clean --force
# RUN yarn install --frozen-lockfile

FROM public.ecr.aws/lambda/nodejs:18 As production
#https://www.cloudtechsimplified.com/run-docker-containers-images-from-ecr-in-aws-lambda-along-with-cicd/
WORKDIR ${LAMBDA_TASK_ROOT} 
COPY  --from=build /usr/src/app/node_modules ./node_modules
COPY  --from=build /usr/src/app/dist ./dist
CMD [ "node", "dist/src/lambda.handler" ]