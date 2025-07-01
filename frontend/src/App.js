import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AdminPanel from "./components/AdminPanel";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header
          className="App-header"
          style={{ padding: "1rem", backgroundColor: "#282c34" }}
        >
          <nav>
            <Link
              to="/"
              style={{
                margin: "0 1rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Landing Page
            </Link>
            <Link
              to="/admin"
              style={{
                margin: "0 1rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Admin Panel
            </Link>
          </nav>
        </header>

        <main style={{ padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
