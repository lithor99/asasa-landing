FROM node:22-alpine


# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN yarn install
# RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# set more memory ram to build option
# RUN NODE_OPTIONS="--max-old-space-size=6144"

# build app for production with minification
RUN yarn run build
# RUN npm run build

EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]
