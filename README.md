## _WILL COME BACK TO FIX THIS PROJECT_
Feb 2022: Took a look again at this project, this should just be used for learning as the code is terrible both on the front and backend.
I'll probably come back again to improve everything since I've made this at the start of my learning phase when trying to make a MEVN project.
I've redeployed it again here: https://exocial.onrender.com/
# EXOCIAL
## Vue3 Social Network APP
Preview here: https://exocial.onrender.com/
- [![CodeFactor](https://www.codefactor.io/repository/github/y-essine/vite-social/badge)](https://www.codefactor.io/repository/github/y-essine/vite-social)
## Description
A vue social network web app with a responsive UI
Built using Vue && Tailwind for the frontend and MongoDB, Express, Node for the backend

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
Create a .env file in the root folder, put in your `MONGO_URI` (you can get this from MongoAtlass) and `SECRET_KEY` as follows:
```
MONGO_URI = <your_mongo_uri>
SECRET_KEY = <choose_a_secret_string>
```
example:
`.env`
```shell
MONGO_URI = 'mongodb+srv://username:password@clusterize.hyupy.mongodb.net/database?retryWrites=true&w=majority'
SECRET_KEY = 'SECRET_KEY'
```

• For production / deployment
add to the `.env`
```shell
NODE_ENV = 'production'
```

## Running the project
• Development
Starting off, you should of course: `npm install`
Then enter the run command: `npm run dev`, this will run both the server and client servers at the same time using the npm package `concurrently`

Or you can run them independently by going `npm run server` in the root folder and `npm run dev` in `client/`
• Production
Build and run everything:
`npm run build && npm start`

~~## Todos:~~
- ~~Migrate current methods to vuex/pinia micro-services~~
- ~~Lazy loading posts~~
- ~~Edit posts~~
- ~~Check follow(ers/ings) lists~~
- ~~Implement comments system for posts~~
- ~~Implement notifications system~~
- ~~Integrate sockets system for follows + likes with live notifs~~
- ~~Implement a chatting system~~
- ~~Work on SEO and general metadata stuff~~

# Preview screenshots:

![prev1](https://i.imgur.com/GT553gk.png)
![prev2](https://i.imgur.com/XULHDAR.png)
