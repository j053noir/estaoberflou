# Estaoverflou

Public API that allows users to manage their personal tasks.

## Installation

Clone this repository and run in the directory

```shell
git clone https://github.com/j053noir/estaoberflou.git && cd estaoberflou
```

```shell
npm install
```

In the root folder rename the ".env.example" file to ".env", and change the SERVER_PORT to an available port, eg:

```text
SERVER_PORT=3000
```

Set the url, username and password of your MONGODB server,in the ".env" file

```text
DATABASE_URL=
DATABASE_USERNAME=
DATABASE_PASSWORD=
```

If the database doesn't need username and password leave the fields empty.

Set any string to token secret

```text
TOKEN_SECTET=
```

## Start the server

To start the server in production mode run:

```shell
npm start
```

To start the server in development mode run:

```shell
npm run dev
```

# API V1.0

Not yet available

## Testing

Not yet available.
