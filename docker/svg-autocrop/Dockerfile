FROM cimg/node:lts-browsers

WORKDIR /home/circleci/project/app

RUN git clone https://github.com/cncf/svg-autocrop.git /home/circleci/project/app \
  && npm install puppeteer@latest \
  && npm install \
  && npm install express morgan

COPY ./server.js /home/circleci/project/app/

ENV PORT=3050

CMD ["node", "server.js"]
