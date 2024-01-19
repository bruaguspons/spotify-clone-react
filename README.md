# Spotify Clone with React.js, Express, and TypeScript

This project is a basic clone of the Spotify application, developed using React.js for the frontend, Express for the backend, and TypeScript to enhance code robustness. The backend is containerized with Docker to facilitate server execution and deployment.

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

2. Install dependencies using npm and run dev-server:
```bash
npm install
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

---

## Conclusions

Ready! Now you can access the Spotify clone in your browser and enjoy the basic user experience. If you chose to use Docker, make sure the backend container is running while using the frontend application.