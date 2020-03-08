#order of steps in docker is very important
#pull base image
FROM node:alpine

#create working directory // like create folder for your application
WORKDIR /user/vueapp

#copy only package.json file
#since you just dont need to install node modules every time
COPY ./package.json ./

#Run node install command to install node modules
RUN npm install

#copy bear minimum files from source directory to destination directory
# => first ./ => means snapshot or copy of current directory
# => decond ./ => means your current docker working directory
COPY . .

#set default commands // basically to start the application
CMD ["npm", "run", "serve"]

#expose a port