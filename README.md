# IN18 Labs File Uploader

This is a simple file uploader application built using Node.js for the backend and React (Vite) for the frontend.  
The project allows users to upload files through a clean UI and handles file processing via backend APIs.

## Tech Stack
- Backend: Node.js, Express
- Frontend: React (Vite)
- Database: MySQL
- Package Manager: npm

---

## How to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/ritikkr07/IN18-labs-file-uploader.git
cd IN18-labs-file-uploader


#2. Run Backend
cd backend
npm install
npm start
Backend server will start on:
http://localhost:5000


# api--->
post -http://localhost:5000/documents/uploadhttp://localhost:5000/documents/upload
GET:  http://localhost:5000/documents
GET: http://localhost:5000/documents/:id
DELETE: http://localhost:5000/documents/:id
#3. Run Frontend
cd frontend
npm install
npm run dev


Frontend application will start on:http://localhost:5173
Features
#-----
File upload functionality

Backend API integration

Simple and clean React UI

Proper project structure
