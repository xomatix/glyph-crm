import "./App.css";
import { lazy, Suspense } from "react";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import AiContextsEdit from "./pages/AiContextsEdit";
import GlButton from "../components/GlButton/GlButton";
const AiContextsList = lazy(() => import("./pages/AiContextsList"));
const UsersList = lazy(() => import("./pages/UsersList"));
const CustomersList = lazy(() => import("./pages/Customer/CustomersList"));
const CustomerEdit = lazy(() => import("./pages/Customer/CustomerEdit"));
const SelectorEdit = lazy(() => import("./pages/SelectorsEdit"));
const SelectorsList = lazy(() => import("./pages/SelectorsList"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="navbar">
          <div className="navbar-brand">glyph CRM</div>
          <div className="nav-links">
            <Link className="nav-item" to="/">
              <svg
                className="nav-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Home
            </Link>
            <Link className="nav-item" to="/users">
              <svg
                className="nav-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Users
            </Link>
            <Link className="nav-item" to="/customers">
              <svg
                className="nav-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Customers
            </Link>
            <Link className="nav-item" to="/selectors">
              <svg
                className="nav-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Selectors
            </Link>
            <Link className="nav-item" to="/ai-context">
              <svg
                className="nav-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              AI Context
            </Link>
            {localStorage.getItem("s_id") === "" && (
              <Link className="login-btn nav-item" to="/login">
                <svg
                  className="nav-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H15M11 16L15 12M15 12L11 8M15 12H3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Login
              </Link>
            )}
            {localStorage.getItem("s_id") !== "" && (
              <GlButton
                className="logout-btn"
                action={() => {
                  localStorage.setItem("s_id", "");
                  window.location.href = `/`;
                }}
              >
                <svg
                  className="logout-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Logout
              </GlButton>
            )}
          </div>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<h2>Home Page</h2>} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/customers" element={<CustomersList />} />
            <Route path="/customers/:id" element={<CustomerEdit />} />
            <Route path="/selectors" element={<SelectorsList />} />
            <Route path="/selectors/:id" element={<SelectorEdit />} />
            <Route path="/ai-context" element={<AiContextsList />} />
            <Route path="/ai-context/:id" element={<AiContextsEdit />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
