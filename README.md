# Spotify Clone with React, Express, and TypeScript

This project is a basic clone of the Spotify application, developed using React for the frontend, Express for the backend, and TypeScript to enhance code robustness. The backend is containerized with Docker to facilitate server execution and deployment.

The project is based on this video: https://www.youtube.com/watch?v=WRc8lz-bp78

## Clone the Project

To clone this project to your local machine, follow these steps:

1. Open your terminal and run the following command:

```bash
git clone https://github.com/bruaguspons/spotify-clone-react.git
```

2. Change to the project directory:

```bash
cd spotify-clone-react
```

---

## Setting up the database  (optional)
If you are using Docker, you can ignore this step.

The database used in the project is PostgreSQL, so make sure you have it installed.

Then, execute the following commands:

```bash
psql -U postgres -h localhost -p 5432
```

```bash
CREATE DATABASE spotify;
```

---

## Configuration

There are 3 different .env files in the project:
1. ./env.example (located at the root of the project)
2. ./frontend/env.example
3. ./backend/env.example

The first .env file is for Docker configuration (ignore this one if you're not using Docker).

The second one is for frontend configuration, where you define the URL of your backend.

The third one is for backend configuration, where you define the URL of your database, the port where the server is listening, and a secret key for JWT.

(DO NOT Forget to change "env.example" to ".env")

---

## Install Dependencies

### Frontend

1. Navigate to the "frontend" directory:
```bash
cd frontend
```

2. Install dependencies using npm and run dev-server:
```bash
npm install
npm run dev
```

### Backend

1. Navigate to the "backend" directory:
```bash
cd backend
```

2. Install dependencies using npm, generate db tables and run dev-server:
```bash
npm install

npm run db:init (execute it only once)

npm run dev
```

## Run the Backend and DB with Docker (Optional)
If you prefer to run the backend using Docker, ensure you have Docker installed on your machine. Then, follow these steps:

1. From the project's root directory, build the Docker image

```bash
docker compose build
```

2. Run docker compose
```bash
docker compose up -d
```

3. Once your backer is running y must run the follow command:
```bash
docker exec express-dev npm run db:init
```

---
## Conclusions

Ready! Now you can access the Spotify clone in your browser and enjoy the basic user experience. If you chose to use Docker, make sure the backend container is running while using the frontend application.