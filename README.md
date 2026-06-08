<div align="center">

![Smart Bookmark header](https://capsule-render.vercel.app/api?type=waving&color=0:2563eb,50:4f46e5,100:7c3aed&height=230&section=header&text=Smart%20Bookmark&fontSize=58&fontColor=ffffff&fontAlignY=38&desc=Your%20links.%20Organized.%20Searchable.%20Always%20ready.&descAlignY=60&descSize=18&animation=fadeIn)

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=21&pause=1000&color=6366F1&center=true&vCenter=true&width=720&lines=Build+your+personal+knowledge+hub;Organize+links+into+focused+workspaces;Find+every+bookmark+in+seconds)](https://git.io/typing-svg)

<p>
  A full-stack bookmark manager for collecting articles, research papers,
  videos, tools, and ideas inside clean, searchable workspaces.
</p>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-API-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-ORM-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white)](https://www.sqlalchemy.org/)

</div>

---

## The Idea

Bookmarks should be useful, not forgotten in a crowded browser folder.
Smart Bookmark turns saved links into an organized knowledge system where each
workspace has a purpose and every resource can be found again.

<div align="center">
  <img src="frontend/src/assets/laptop_resol.png" alt="Smart Bookmark visual" width="100%" />
</div>

## Highlights

| | Feature | What it does |
|:--:|---|---|
| `01` | **Smart workspaces** | Group bookmarks by project, topic, or goal. |
| `02` | **Instant search** | Search titles, URLs, and notes with paginated results. |
| `03` | **Secure accounts** | Register and sign in with JWT access and refresh tokens. |
| `04` | **Bookmark context** | Save a title, URL, and note so every link stays meaningful. |
| `05` | **Private collections** | Workspace access is validated against the authenticated user. |
| `06` | **Clean dashboard** | See workspaces and recent bookmarks in one focused view. |

## Tech Stack

```text
Frontend                         Backend
|- React 19                      |- FastAPI
|- React Router                  |- SQLAlchemy
|- Axios                         |- PostgreSQL
|- Vite                          |- Alembic migrations
`- CSS                           `- JWT authentication
```

## Architecture

```mermaid
flowchart LR
    U[User] --> R[React + Vite]
    R -->|Axios / REST| F[FastAPI]
    F --> A[JWT Authentication]
    F --> W[Workspace Service]
    F --> B[Bookmark Service]
    A --> D[(PostgreSQL)]
    W --> D
    B --> D
```

## Project Structure

```text
smart_bookmark/
|- frontend/
|  |- public/
|  `- src/
|     |- api/
|     |- assets/
|     |- components/
|     |- context/
|     `- pages/
|- backend/
|  |- alembic/
|  `- app/
|     |- core/
|     |- db/
|     |- middleware/
|     |- models/
|     `- modules/
|        |- auth/
|        |- bookmarks/
|        `- workspaces/
`- README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- [Python](https://www.python.org/) 3.11 or newer
- [PostgreSQL](https://www.postgresql.org/)

### 1. Clone the repository

```bash
git clone https://github.com/gowthamchoudhary/smart_bookmark.git
cd smart_bookmark
```

### 2. Configure the backend

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

```bash
# Windows PowerShell
.\.venv\Scripts\Activate.ps1

# macOS / Linux
source .venv/bin/activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
pip install alembic
```

Create `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/smart_bookmark
SECRET_KEY=replace-this-with-a-long-random-secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
```

Run the migrations and API:

```bash
alembic upgrade head
uvicorn app.main:app --reload
```

The API runs at `http://127.0.0.1:8000`. Interactive documentation is
available at `http://127.0.0.1:8000/docs`.

### 3. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/auth/register` | Create an account |
| `POST` | `/auth/login` | Get access and refresh tokens |
| `GET` | `/auth/me` | Read the current user |
| `POST` | `/auth/refresh` | Rotate authentication tokens |
| `POST` | `/auth/logout` | Revoke a refresh token |
| `GET/POST` | `/workspace/` | List or create workspaces |
| `GET/PATCH/DELETE` | `/workspace/{id}` | Manage a workspace |
| `POST` | `/bookmarks/{workspace_id}` | Add a bookmark |
| `GET` | `/bookmarks/{workspace_id}/search` | Search a workspace |
| `GET` | `/bookmarks/{workspace_id}/paginated` | Browse bookmarks |
| `DELETE` | `/bookmarks/{workspace_id}/{bookmark_id}` | Remove a bookmark |

## Roadmap

- [x] JWT authentication with refresh-token rotation
- [x] Workspace management and ownership validation
- [x] Bookmark creation, deletion, search, and pagination
- [x] Responsive landing page and dashboard foundation
- [ ] Connect every dashboard interaction to the API
- [ ] Bookmark editing, favorites, and tags
- [ ] Browser extension for one-click saving
- [ ] Rich link previews and automatic metadata
- [ ] Deployment and automated test coverage

## Contributing

Contributions are welcome. Fork the repository, create a focused branch, and
open a pull request with a clear description of the change.

```bash
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```

<div align="center">

### Keep the useful parts of the internet close.

[Back to top](#smart-bookmark)

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:7c3aed,50:4f46e5,100:2563eb&height=120&section=footer)

</div>
