from node:16
workdir /user/src/app
copy package*json ./
run npm install
copy . .
expose 3000
CMD ["npm", "start"]