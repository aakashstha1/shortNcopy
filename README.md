# ShortCopy 🔗

A URL shortener application that allows users to generate shortened URLs with a clean and responsive user interface.

## ✨ Features

- 🔗 Shorten long URLs instantly  
- 📋 Copy shortened URLs to clipboard  
- ⚡ Fast and responsive UI  
- ✅ URL validation using Zod  
- 🔄 Prevent duplicate shortened URLs for identical links  
- 📱 Mobile responsive design  
- 🎨 Modern UI built with Tailwind CSS & shadcn/ui  
- ⚛️ React Query for API state management  
- ☁️ MongoDB Atlas database integration  

## 🛠️ Tech Stack

### Frontend

- Next.js  
- TypeScript  
- Vite  
- Tailwind CSS  
- shadcn/ui  
- TanStack Query  
- Zod
- pnpm 

### Backend

- Node.js  
- Express.js  
- MongoDB  
- Typescript
- Joi

## 📂 Project Structure

```text
shortNpay/
│
├── frontend/
│   ├── app/
│   |   ├──  globals.css
│   │   ├──  layout.tsx
│   │   ├──  page.tsx  
│   │   ├───api
│   |   │       api.ts
│   |   │       
│   |   ├───config
│   |   │       env.ts
│   |   │       
│   |   ├───features
│   |   │   └───url
|   |   │           url.types.ts
│   |   │           urlService.ts
│   │   |          useShortenUrl.ts
│   │   |       
│   |   └───providers
│   |         providers.tsx
│   |
│   ├───components/
│   ├───utils/
│   └───public/
│   
└── backend/
     └──src/
         │──configs
         │      db-config.js
         │      express-config.js
         │      router-config.js
         │       
         ├───constants
         │       http-response-code.js
         │       http-response-message.js
         │       
         ├───middlewares
         │       request-validator-middleware.js
         │       
         └───modules
             └───url
                   url-controller.js
                   url-model.js
                   url-request.js
                   url-router.js
                   url-service.js
```

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js  
- `pnpm` or `npm`  
- MongoDB Atlas account  

### ⚙️ Environment Variables

#### Backend `.env`

Create a `.env` file inside the `backend` directory:

```env
PORT=8000
BACKEND_URL=http://localhost:8000/api/v1

MONGODB_URL=your_mongodb_connection_string
MONGODB_NAME=shortNCopy

BASE_URL=http://localhost:8000

CLIENT_URL=http://localhost:5173
```
#### Frontend `.env`

Create a `.env` file inside the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📦 Installation

### Clone Repository

```bash
git clone https://github.com/aakashstha1/shortNcopy.git
```

### Install Frontend Dependencies

```bash
cd frontend
pnpm install
```

or

```bash
npm install
```

### Install Backend Dependencies

```bash
cd backend
pnpm install
```

or

```bash
npm install
```

## ▶️ Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

### Start Frontend Server

```bash
cd frontend
pnpm run dev
```

## 🌐 Application URLs

| Service   | URL                        |
|-----------|----------------------------|
| Frontend  | http://localhost:5173/     |
| Backend   | http://localhost:8000/     |

## 🔁 URL Redirect Flow

1. User submits a long URL  
2. Backend checks if URL already exists  
3. If exists → returns existing short URL  
4. If not exists → creates new short URL  
5. Visiting short URL redirects to original URL  


## 📊 Future Improvements

- 🔐 Authentication  
- 📈 Click analytics  
- 🌍 Custom domains  
- 💳 Payment integration  
- 📅 URL expiration  
- 👤 User dashboard  

## 👤 Authors

- **Aakash Shrestha**  
- **Saurab Shrestha**
