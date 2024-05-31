FROM node:20
WORKDIR /ps-angular

ARG PORT_BUILDER=4200
ENV PORT=$PORT_BUILDER

ARG API_URL_BUILDER=url
ENV API_URL=$API_URL_BUILDER

EXPOSE $PORT_BUILDER

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

EXPOSE 4200
CMD ["npm", "run", "serve:ssr:ps-Angular"]