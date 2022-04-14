## _-- CURRENTLY IN DEVELOPMENT --_
# EXOCIAL
## Vue3 Social Network APP
Demo: https://exocial.herokuapp.com/
- [![CodeFactor](https://www.codefactor.io/repository/github/y-essine/vite-social/badge)](https://www.codefactor.io/repository/github/y-essine/vite-social)
## Description
A vue social network web app with a responsive UI
Built using Vanilla Vue3 for the front-end and MongoDB, Express, Node for the back-end

## Dependencies
 ***Client:***
```
"dependencies": {
    "@fortawesome/vue-fontawesome": "^3.0.0-5",  
    "@kyvg/vue3-notification": "^2.3.4",  
    "@tailwindcss/line-clamp": "^0.3.0",  
    "axios": "^0.24.0",  
    "vue": "^3.2.23",  
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
    "express": "^4.17.2",  
    "express-rate-limit": "^5.5.1",  
    "jsonwebtoken": "^8.5.1",  
    "mongoose": "^6.1.2",  
    "morgan": "^1.10.0"  
  },  
  "devDependencies": {  
    "concurrently": "^6.5.0",  
    "nodemon": "^2.0.15"  
  }
  ```

## Config
As seen in the config.js file `mongoUri: process.env.MONGO_URI,`, the database uri is access through the environment variables so in order to set it up 
use the cmd `export MONGO_URI=<your_uri>` replacing your_uri with yours...
the same for the jwt secret key `export SECRET_KEY=<your_key>`

## Running the build
Run command: `npm run dev`

## Todos:
- Migrate current methods to vuex/pinia micro-services
- Lazy loading posts
- Edit posts
- Check follow(ers/ings) lists
- Implement notifications system
- Integrate sockets system with follows + likes for live notifs
- Implement a chatting system


