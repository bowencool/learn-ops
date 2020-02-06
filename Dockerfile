FROM node
ENV A=123
WORKDIR /usr/src/app
RUN yarn
COPY . .
CMD ["node", "index.js"]
