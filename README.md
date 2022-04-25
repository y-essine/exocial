## _-- CURRENTLY IN DEVELOPMENT --_
# EXOCIAL
## Vue3 Social Network APP
Demo: https://exocial.herokuapp.com/
- [![CodeFactor](https://www.codefactor.io/repository/github/y-essine/vite-social/badge)](https://www.codefactor.io/repository/github/y-essine/vite-social)
## Description
A vue social network web app with a responsive UI
Built using Vanilla Vue3 for the front-end and MongoDB, Express, Node for the back-end


## Config
As seen in the config.js file `mongoUri: process.env.MONGO_URI,`, the database uri is access through the environment variables so in order to set it up 
use the cmd `export MONGO_URI=<your_uri>` replacing your_uri with yours...
the same for the jwt secret key `export SECRET_KEY=<your_key>`

## Running the project
Run command: `npm run dev`

## Todos:
- Migrate current methods to vuex/pinia micro-services
- Lazy loading posts
- Edit posts
- Check follow(ers/ings) lists
- Implement comments system for posts
- Implement notifications system
- Integrate sockets system with follows + likes for live notifs
- Implement a chatting system


