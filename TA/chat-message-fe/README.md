## Running with Docker

This project includes Docker support for both the React frontend and the Node.js backend. The setup uses multi-stage builds for optimized images and a Docker Compose file for easy orchestration.

### Requirements
- Docker and Docker Compose installed
- No additional local dependencies required
- Node.js version: `22.13.1-slim` (as specified in Dockerfiles)

### Environment Variables
- The backend service (`js-server`) loads environment variables from `./server/.env` (see that file for required variables).
- No environment variables are required for the frontend service (`js-root`).

### Build and Run
To build and start the entire application stack:

```sh
# From the project root directory
docker compose up --build
```

This will build and start both services:
- **js-root** (React frontend): available at [http://localhost:3000](http://localhost:3000)
- **js-server** (Node.js backend): available at [http://localhost:3001](http://localhost:3001)

### Ports
- Frontend (`js-root`): **3000**
- Backend (`js-server`): **3001**

### Special Configuration
- Both services run as non-root users for improved security.
- The backend service requires a `.env` file in the `server/` directory.
- The frontend is served using the `serve` package for static files.

For more details, see the `Dockerfile` and `compose.yaml` files in the project.