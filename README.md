<h1 align="center">Chiikawa News Network</h1>
<h3 align="center"></h3>
<p align="center">
    <img align="center" width="700px" src="" >
</p>

### Features

## Endpoints & Socket Events

| Method | URI                   | Function               | Token | Body                                | Notes         |
| ------ | --------------------- | ---------------------- | ----- | ----------------------------------- | ------------- |
| POST   | /signup               | Create user            | N     | { username, password}               |               |
| POST   | /login                | Login user             | N     | { username, password}               |               |
| GET    | /current              | Retrieve current user  | Y     |                                     |               |
| GET    | /users                | Retrieve all users     | Y     |                                     |               |
| GET    | /users/:userId        | Retrieve user data     | Y     |                                     |               |
| PATCH  | /users/:userId        | Update bio             | Y     | { bio }                             |               |
| PATCH  | /users/:userId/avatar | Update profile picture | Y     | { avatar }                          |               |
| GET    | /users/:userId/posts  | Retrieve posts by user | Y     |                                     |               |
| GET    | /chats-public         | Retrieve public chats  | Y     |                                     |               |
| GET    | /chats                | Retrieve chats         | Y     |                                     |               |
| POST   | /chats                | Create chat            | Y     | { name, userIds: ['id_1', 'id_2'] } |               |
| GET    | /chats/:chatId        | Retrieve chat          | Y     |                                     |               |
| PATCH  | /chats/:chatId        | Update chat name       | Y     | { name }                            | name optional |
| DELETE | /chats/:chatId        | Delete chat            | Y     |                                     |               |
| GET    | /posts                | Retrieve all posts     | Y     |                                     | query: userId |
| POST   | /posts                | Create post            | Y     | { title, content, media }           |               |
| DELETE | /posts/:postId        | Delete post            | Y     |                                     |               |
| POST   | /posts/:postId/likes  | Like post              | Y     |                                     |               |
| DELETE | /posts/:postId/likes  | Unlike post            | Y     |                                     |               |

| Socket Event      | Arguments      | Use                              |
| ----------------- | -------------- | -------------------------------- |
| 'connection'      | token          | socket connection                |
| 'send_message'    | token, message | sending messages                 |
| 'receive_message' | message        | notify client to update messages |
| 'join_room'       | token, chatId  | join chat                        |
| 'disconnecting'   |                | leave rooms before disconnect    |
| 'disconnect'      |                | log id has disconnected          |

## Stack

```
client/            # Frontend (React, Vite, Tailwind, etc.)
server/            # Backend (Express, Prisma, Passport, etc.)
```

### Frontend

-   React (with Vite)
-   React Router
-   Tailwind CSS
-   Socket.io for real-time communication
-   Motion for smooth animations
-   Date-fns for date formatting

### Backend

-   Node.js with Express for REST API
-   Prisma ORM w/ PostgreSQL database
-   Socket.io
-   Supabase Storage for saving user uploaded profile pictures
-   Multer and Sharp for file upload and image processing
-   Express validator for endpoint input validation
-   Jsonwebtoken & bcryptjs from authentication / authorization

## App Showcase

## Learning Outcomes

-   Interaction

-   Backend

    -   Post: implmenting user hasLiked field - Prisma doesn't support CASE statement so we jerry rigged one

-   Frontend
    -   revisiting how stacking contexts work

### Retrospective aka yapping

## Start commands

```bash
# Start backend server
cd server
npm install
node --watch server.js
```

```bash
# Start frontend react
cd client
npm install
npm run dev

# OR
cd client
npm install
npm run build
npm run preview
```

### Environment variables

```bash
# ./backend/.env
PORT
SERVER_URI
CLIENT_URI
DATABASE_URL
TOKEN_SECRET
SUPABASE_URL
SUPABASE_KEY
SUPABASE_DEFAULT_CHAT_AVATAR
SUPABASE_DEFAULT_GROUP_CHAT_AVATAR
SOCKET_ADMIN_USERNAME
SOCKET_ADMIN_PASSWORD

# ./client/.env
VITE_SERVER_URL
```

## Acknowledgements

| Usage  | Source                                                                          |
| ------ | ------------------------------------------------------------------------------- |
| Images | Chiikawa                                                                        |
| Icons  | Google material icons                                                           |
| Specs  | [The Odin Project](https://www.theodinproject.com/lessons/nodejs-messaging-app) |

## TODO

-   client

    -   bug: profile, settings, chat overflow scroll

-   server

    -   post comments
        - schema
        - db queries
        - comment likes.. yikes!!!
        - routes
            - POST /post/:postId/comments
            - Delete /post/:postId/comments
            - POST /comments/:commentId/likes
            - DELETE /comments/:commentId/likes

-   order

    -   github login
    -   users page
    -   follows
        -   when implementing followers -> only serve posts created by followed users

-   low prio

    -   update login/signup
        -   add images and stuff idk just a form is kinda boring
    -   test UI with long usernames
    -   landscape orientation mobile (message please use portrait / block use in landscape)
        -   when keyboard pops up, does everything go to shit? (probably...)
    -   POSTS
        -   PATCH /posts/:postId (IF I WANT TO IMPLEMENT EDITING - LOWPRIO TBH)
        -   DELETE /posts/:postId
    -   Return data in this style
        {
        "data": [ ... ],
        "meta": { "count": 20, "next": "/posts?page=2" }
        }
        -   PAGINATION FOR POSTS

## DATA

-   ad5d9cc2-bf80-4ab2-90c0-e60619883660 | kurimanju
-   21cb2aab-61ee-498a-b438-f0524f342441 | momonga
-   9c49b34e-3ce1-46ab-b80d-73ac3e6654f5 | hachiware
-   b5f53d61-373e-4777-804a-5d6cd4330d02 | chiikawa
-   55e1d476-6430-4b52-936c-a84d2fed8d82 | shisaa
-   1736b7af-8c60-4c2b-9254-6c08662fb2e4 | usagii

-   POST
    -   95de95c3-d28a-4040-8060-9f6d096a0b4a | kurimanju
