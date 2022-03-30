FROM node:lts-alpine

WORKDIR /snapdrop

COPY . /snapdrop

RUN npm install

ENV PORT=80

CMD ["npm", "start"]
