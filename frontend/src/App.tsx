import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Todos from "./pages/todos";
import PrivateRoute from "./components/privateRoutes";

export default function App() {
  return (
    <div>
      <nav className="p-4 border-b">
        <Link to="/todos" className="mr-4">Todos</Link>
        <Link to="/login" className="mr-4">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PrivateRoute><Todos /></PrivateRoute>} />
        <Route path="/todos" element={<PrivateRoute><Todos /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
