<h1 align="center">Chiikawa News Network</h1>
<h3 align="center"></h3>
<p align="center">
    <img align="center" width="700px" src="" >
</p>

### Features

## Endpoints & Socket Events

| Method | URI                        | Function                    | Token | Body                                | Notes                               |
| ------ | -------------------------- | --------------------------- | ----- | ----------------------------------- | ----------------------------------- |
| POST   | /signup                    | Create user                 | N     | { username, password}               |                                     |
| POST   | /login                     | Login user                  | N     | { username, password}               |                                     |
| POST   | /login/guest               | Login guest user            | N     |                                     |                                     |
| GET    | /current                   | Retrieve current user       | Y     |                                     |                                     |
| PATCH  | /current/bio               | Update bio                  | Y     | { bio }                             |                                     |
| PATCH  | /current/avatar            | Update avatar               | Y     | { avatar }                          | max 250kb upload                    |
| GET    | /users                     | Retrieve all users          | Y     |                                     |                                     |
| GET    | /users/:userId             | Retrieve user data          | Y     |                                     |                                     |
| GET    | /users/:userId/posts       | Retrieve posts by user      | Y     |                                     | query: limit, cursor                |
| GET    | /users/:userId/followers   | Retrieve followers by user  | Y     |                                     |                                     |
| POST   | /users/:userId/following   | Follow :userId              | Y     |                                     |                                     |
| DELETE | /users/:userId/following   | Unfollow :userId            | Y     |                                     |                                     |
| GET    | /users/:userId/following   | Retrieve following by user  | Y     |                                     |                                     |
| GET    | /chats-public              | Retrieve public chats       | Y     |                                     |                                     |
| GET    | /chats                     | Retrieve chats              | Y     |                                     |                                     |
| POST   | /chats                     | Create chat                 | Y     | { name, userIds: ['id_1', 'id_2'] } |                                     |
| GET    | /chats/:chatId             | Retrieve chat               | Y     |                                     |                                     |
| PATCH  | /chats/:chatId             | Update chat name            | Y     | { name }                            | name optional                       |
| DELETE | /chats/:chatId             | Delete chat                 | Y     |                                     |                                     |
| GET    | /posts                     | Retrieve all posts          | Y     |                                     | query: userId, limit, cursor        |
| GET    | /posts/feed                | Retrieve posts by following | Y     |                                     | query: limit, cursor                |
| POST   | /posts                     | Create post                 | Y     | { title, content, media }           | max 250kb upload, accepts media URL |
| DELETE | /posts/:postId             | Delete post                 | Y     |                                     |                                     |
| POST   | /posts/:postId/likes       | Like post                   | Y     |                                     |                                     |
| DELETE | /posts/:postId/likes       | Unlike post                 | Y     |                                     |                                     |
| GET    | /posts/:postId/comments    | Retrieve comments           | Y     |                                     |                                     |
| POST   | /posts/:postId/comments    | Create comment              | Y     | { content }                         |                                     |
| DELETE | /comments/:commentId       | Delete comment              | Y     |                                     |                                     |
| POST   | /comments/:commentId/likes | Like comment                | Y     |                                     |                                     |
| DELETE | /comments/:commentId/likes | Unlike comment              | Y     |                                     |                                     |

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

    -   Testing on an actual mobile device! (broadcasting server & client through my WiFi signal)

-   Backend

    -   Pagination: Implement cursor based pagination for retrieving posts
    -   Prisma CASE Statement: Prisma doesn't support CASE statement so I jerry rigged one to implement a hasLiked field for posts

-   Frontend

    -   Executing code on scrolling to bottom on component
    -   Learning sentinel pattern with IntersectionObserver API for infinite scrolling
    -   Revisiting how stacking contexts work

### Retrospective aka yapping

-   Frontend
    -   Super proud of my styling
    -   Super proud of the UserInfo grid styling (Desktop/Mobile same components but changing grid values)

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

-   bugs

-   client

    -   gif bar

-   server

    -   github login
    -   guest account login route
        -   shared guest account
        -   seed on startup
            -   db query
            -   
        -   Guest template data
        -   Guest login route

-   low prio

-   client: check what breaks when using long username
-   refactor hooks for DRY

## DATA

-   ad5d9cc2-bf80-4ab2-90c0-e60619883660 | kurimanju
-   21cb2aab-61ee-498a-b438-f0524f342441 | momonga
-   9c49b34e-3ce1-46ab-b80d-73ac3e6654f5 | hachiware
-   b5f53d61-373e-4777-804a-5d6cd4330d02 | chiikawa
-   55e1d476-6430-4b52-936c-a84d2fed8d82 | shisaa
-   1736b7af-8c60-4c2b-9254-6c08662fb2e4 | usagii

File { name: "6-kurimanju.png", lastModified: 1742602447722, webkitRelativePath: "", size: 31418, type: "image/png" }
