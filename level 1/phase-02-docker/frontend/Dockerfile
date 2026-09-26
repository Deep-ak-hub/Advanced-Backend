FROM node

WORKDIR /app

# COPY package.json package.json
# COPY package-lock.json package-lock.json

# copy all the files starting from pacakge 
COPY package*.json .

RUN npm install

# COPY index.js index.js
# copy all the files and folders at once
COPY . .

CMD [ "npm","run", "dev"]