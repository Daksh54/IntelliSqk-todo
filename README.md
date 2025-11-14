Full Stack Todo Application Ai integrated platform
#Its an full stack ai application
##It includes 
### **Authentication**
- User Signup  
- User Login  
- JWT-based session management

### **Todo Management**
- Create Todo  
- List Todos  
- Update Todo  
- Delete Todo  
- Mark Todo as completed / uncompleted

  ### **AI Features (Groq Llama-3, Python AI service)**
- AI-powered todo suggestions  
- AI-based automatic categorization  
- Frontend autofill powered by AI results  
- Modular Python microservice communicating with Node backend


## Tech Stack

### **Frontend**
- React + TypeScript  
- React Router  
- Zustand (global state)  
- React Query  
- React Hook Form  
- Axios  
- TailwindCSS  

### **Backend**
- Node.js + TypeScript  
- Express.js  
- MongoDB + Mongoose  
- JWT authentication  
- Error handling + Logging  

### **AI Microservice**
- Python  
- FastAPI  
- Groq Llama-3 API 

React → Node → Python AI → Node → React

### Setup .env file

```ts
PORT=...
MONGO_DB_URI=...
JWT_SECRET=...
```
## API Design

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/auth/signup` | Create a new account |
| `POST` | `/api/auth/login` | Log in |
| `POST` | `/api/auth/forgot` | Request Reset |
| `POST` | `/api/auth/reset` | Reset Password |
| `GET`,`POST` | `/api/todos/` | Add Todos, Shows Todos |
| `PUT`,`DELETE` | `/api/ai/:id` | Update Todos, Delete Todos |
| `POST` | `/api/ai/suggest` | Suggest the Todos |
| `POST` | `/api/ai/categorize` | Categorize based on priority |

## Future Improve

Redis Caching + Rate Limiting
Microservices Architecture
Background Job Queue
Add Distributed Logging & Monitoring
Pagination, Sorting, Filtering
Database Sharding
AI Daily Summary
AI Daily Summary
