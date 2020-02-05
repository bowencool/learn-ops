FROM node
ENV A=123
WORKDIR /usr/src
RUN yarn
COPY . .
CMD ["node", "index.js"]
