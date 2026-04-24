FROM node:20

# create app directory
WORKDIR /app

# copy package files
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . .

# build (if using TS)
RUN npm run build

# expose port
EXPOSE 3000

# run app
CMD ["node", "dist/server.js"]