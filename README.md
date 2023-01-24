## _-- STOPPED DEVELOPING THIS, WILL COME BACK TO IMPROVE UPON THIS! --_
# EXOCIAL
## Vue3 Social Network APP
Demo: https://exocial.herokuapp.com/
--Demo not working anymore since heroku turned to paid subscriptions
- [![CodeFactor](https://www.codefactor.io/repository/github/y-essine/vite-social/badge)](https://www.codefactor.io/repository/github/y-essine/vite-social)
## Description
A vue social network web app with a responsive UI
Built using Vue3 for the front-end and MongoDB, Express, Node for the back-end

## Techs used
 ***Client:***
```
Vue3
Tailwindcss
Axios
```
***Server:***
```
Node / Nodemon
Express
Mongoose / MongoDB
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
