# #############
# ### build ###
# #############

# # base image
# FROM node:14.15.1-alpine as build

# ARG API_URL
# ENV REACT_APP_API_URL=$API_URL
# ARG SOCKET_URL
# ENV REACT_APP_SOCKET_URL=$SOCKET_URL
# ARG ADMIN_EMAIL
# ENV REACT_APP_ADMIN_EMAIL=$ADMIN_EMAIL

# # set working directory
# WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install and cache app dependencies
# COPY package.json /app/package.json

# ENV HUSKY_SKIP_INSTALL=1
# RUN yarn install --network-timeout 1000000

# # add app
# COPY . /app

# # generate build
# RUN yarn build

############
### prod ###
############

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
