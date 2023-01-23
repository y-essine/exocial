## _-- STOPPED DEVELOPING THIS, WILL COME BACK TO IMPROVE UPON THIS! --_
# EXOCIAL
## Vue3 Social Network APP
Demo: https://exocial.herokuapp.com/
- [![CodeFactor](https://www.codefactor.io/repository/github/y-essine/vite-social/badge)](https://www.codefactor.io/repository/github/y-essine/vite-social)
## Description
A vue social network web app with a responsive UI
Built using Vue3 for the front-end and MongoDB, Express, Node for the back-end

## Techs used
 ***Client:***
```
"dependencies": {
    "@fortawesome/fontawesome-svg-core": "^1.2.36",
    "@fortawesome/free-solid-svg-icons": "^5.15.4",
    "@fortawesome/vue-fontawesome": "^3.0.0-5",
    "@kyvg/vue3-notification": "^2.3.4",
    "@tailwindcss/line-clamp": "^0.3.0",
    "axios": "^0.24.0",
    "moment": "^2.29.1",
    "nprogress": "^0.2.0",
    "socket.io": "^4.4.1",
    "socket.io-client": "^4.1.0",
    "validator": "^13.7.0",
    "vite-stack": "file:..",
    "vue": "^3.2.23",
    "vue-content-loader": "^2.0.1",
    "vue-router": "^4.0.12",
    "vuex": "^4.0.2"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^1.10.2",
    "autoprefixer": "^10.4.0",
    "concurrently": "^6.4.0",
    "eslint": "^8.4.1",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-vue": "^8.2.0",
    "postcss": "^8.4.4",
    "prettier": "^2.5.1",
    "sass": "^1.45.1",
    "tailwindcss": "^3.0.1",
    "vite": "^2.7.0"
  }
```  

***Server:***
```
"dependencies": {
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.1",
    "cors": "^2.8.5",
    "express": "^4.17.3",
    "express-fileupload": "^1.2.1",
    "express-rate-limit": "^5.5.1",
    "helmet": "^4.6.0",
    "imgur": "^2.1.3",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.1.2",
    "morgan": "^1.10.0",
    "socket.io": "^4.4.1",
    "vue": "^3.2.31"
  },
  "devDependencies": {
    "concurrently": "^6.5.0",
    "dotenv": "^10.0.0",
    "kill-port": "^1.6.1",
    "nodemon": "^2.0.15"
  }
  ```

## Config
Then as seen in the config.js file `mongoUri: process.env.MONGO_URI,`, the database uri is access through the environment variables so in order to set it up 
use the cmd `export MONGO_URI=<your_uri>` replacing your_uri with yours...
the same for the jwt secret key `export SECRET_KEY=<your_key>`

## Running the project
Starting off, you should of course: `npm install`
Then enter the run command: `npm run dev`, this will run both the server and client servers at the same time using the npm package `concurrently`

## Todos:
- Migrate current methods to vuex/pinia micro-services
- Lazy loading posts
- Edit posts
- Check follow(ers/ings) lists
- Implement comments system for posts
- Implement notifications system
- Integrate sockets system for follows + likes with live notifs
- Implement a chatting system
- Work on SEO and general metadata stuff
