FROM node:20
WORKDIR /ps-angular
COPY . .
RUN npm install
EXPOSE 4200
CMD ["npm", "start"]