<h1 align="center">Chiikawa News Network</h1>
<h3 align="center"></h3>
<p align="center">
    <img align="center" width="700px" src="" >
</p>

### Features

## Endpoints & Socket Events

| Method | URI                      | Function                    | Token | Body                                | Notes                        |
| ------ | ------------------------ | --------------------------- | ----- | ----------------------------------- | ---------------------------- |
| POST   | /signup                  | Create user                 | N     | { username, password}               |                              |
| POST   | /login                   | Login user                  | N     | { username, password}               |                              |
| GET    | /current                 | Retrieve current user       | Y     |                                     |                              |
| PATCH  | /current/bio             | Update bio                  | Y     | { bio }                             |                              |
| PATCH  | /current/avatar          | Update avatar               | Y     | { avatar }                          |                              |
| GET    | /users                   | Retrieve all users          | Y     |                                     |                              |
| GET    | /users/:userId           | Retrieve user data          | Y     |                                     |                              |
| GET    | /users/:userId/posts     | Retrieve posts by user      | Y     |                                     | query: limit, cursor         |
| GET    | /users/:userId/followers | Retrieve followers by user  | Y     |                                     |                              |
| POST   | /users/:userId/followers | Follow :userId              | Y     |                                     |                              |
| GET    | /users/:userId/following | Retrieve following by user  | Y     |                                     |                              |
| GET    | /chats-public            | Retrieve public chats       | Y     |                                     |                              |
| GET    | /chats                   | Retrieve chats              | Y     |                                     |                              |
| POST   | /chats                   | Create chat                 | Y     | { name, userIds: ['id_1', 'id_2'] } |                              |
| GET    | /chats/:chatId           | Retrieve chat               | Y     |                                     |                              |
| PATCH  | /chats/:chatId           | Update chat name            | Y     | { name }                            | name optional                |
| DELETE | /chats/:chatId           | Delete chat                 | Y     |                                     |                              |
| GET    | /posts                   | Retrieve all posts          | Y     |                                     | query: userId, limit, cursor |
| GET    | /posts/feed              | Retrieve posts by following | Y     |                                     | query: limit, cursor         |
| POST   | /posts                   | Create post                 | Y     | { title, content, media }           |                              |
| DELETE | /posts/:postId           | Delete post                 | Y     |                                     |                              |
| POST   | /posts/:postId/likes     | Like post                   | Y     |                                     |                              |
| DELETE | /posts/:postId/likes     | Unlike post                 | Y     |                                     |                              |
| POST   | /posts/:postId/comments  | Create comment              | Y     | { content, media }                  |                              |
| DELETE | /comments/:commentId     | Delete comment              | Y     |                                     |                              |

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

    -   Pagination: Implement cursor based pagination for retrieving posts
    -   Prisma CASE Statement: Prisma doesn't support CASE statement so I jerry rigged one to implement a hasLiked field for posts

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

    -   home


-   server

    -   github login
    -   guest account login route
    -   pagination: ensure limit and cursor query are UUID

-   Task List

    -   posts
    -   post like
    -   post comments

-   low prio

    -   update login/signup
        -   add images and stuff idk just a form is kinda boring
    -   test UI with long usernames
    -   landscape orientation mobile (message please use portrait / block use in landscape)
        -   when keyboard pops up, does everything go to shit? (probably...)
    -   POSTS
        -   PATCH /posts/:postId (IF I WANT TO IMPLEMENT EDITING - LOWPRIO TBH)
    -   Pagination
        -   users
        -   messages
    -   change all titles to style like simple title in home (without yellow block!)
    -   refactor scrolling just to scroll off entire page instead of off a block or smth

## DATA

-   ad5d9cc2-bf80-4ab2-90c0-e60619883660 | kurimanju
-   21cb2aab-61ee-498a-b438-f0524f342441 | momonga
-   9c49b34e-3ce1-46ab-b80d-73ac3e6654f5 | hachiware
-   b5f53d61-373e-4777-804a-5d6cd4330d02 | chiikawa
-   55e1d476-6430-4b52-936c-a84d2fed8d82 | shisaa
-   1736b7af-8c60-4c2b-9254-6c08662fb2e4 | usagii

-   POST

    -   95de95c3-d28a-4040-8060-9f6d096a0b4a | kurimanju

-   createComment('55e1d476-6430-4b52-936c-a84d2fed8d82', '95de95c3-d28a-4040-8060-9f6d096a0b4a', 'Let\'s share a cold Orion beer when I get my drinking license~');
-   likeComment('55e1d476-6430-4b52-936c-a84d2fed8d82', '6a22f041-e461-4cb1-a0d1-8d2bea72359c')

{
"id": "41c8e640-107e-42d3-bc54-19bd839c5bd4",
"title": "REFACTORED UPLOAD",
"content": "TEST TEST TEST MEDIA",
"media": null,
"createdAt": "2025-09-06T20:47:46.414Z",
"authorId": "1736b7af-8c60-4c2b-9254-6c08662fb2e4",
"author": {
"id": "1736b7af-8c60-4c2b-9254-6c08662fb2e4",
"username": "usagii",
"avatar": "https://bpchhgiihbdqtamrfehs.supabase.co/storage/v1/object/public/avatar/user-1736b7af-8c60-4c2b-9254-6c08662fb2e4/avatar-1756332287321.webp"
},
"comments": [],
"hasLiked": false,
"likeCount": 0
},
