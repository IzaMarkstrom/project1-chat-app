# Chat app

This is chat app is built with TypeScript, React, Express and MongoDB. 
## Run with docker

1. Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
git clone https://github.com/IzaMarkstrom/project1-chat-app.git
```
2. Create an .env file in workspaces/server and include the following environment variable:

```bash
TOKEN_SECRET = choose a secret token
```
3. Use this command to run the project:

```bash
docker compose --env-file packages/server/.env up --build
```
