FROM node:8.1.0

# Create app dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


COPY package.json /usr/src/app/
RUN npm install

# Copy app into the image
COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]
