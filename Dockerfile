# base image
FROM node:18-alpine as build

# set working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . .

RUN npm install --silent
RUN npm install -g serve

# Create Build
RUN npm run build

# Specify port
EXPOSE 3000

# start app
CMD ["serve", "-l", "3000", "-s", "build"]