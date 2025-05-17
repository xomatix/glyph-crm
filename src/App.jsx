import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import AiContextsEdit from "./pages/AiContextsEdit";
import GlButton from "../components/GlButton/GlButton";
import RecordLogs from "./pages/RecordLogs/RecordsLogs";
import service from "../glService/glService";
import { useState } from "react";
const BadgesList = lazy(() => import("./pages/Badge/BadgesList"));
const BadgeEdit = lazy(() => import("./pages/Badge/BadgeEdit"));
const AiContextsList = lazy(() => import("./pages/AiContextsList"));
const UsersList = lazy(() => import("./pages/Users/UsersList"));
const UserEdit = lazy(() => import("./pages/Users/UserEdit"));
const EventsList = lazy(() => import("./pages/Events/EventsList"));
const StatusesList = lazy(() => import("./pages/Statuses/StatusesList"));
const StatusEdit = lazy(() => import("./pages/Statuses/StatusEdit"));
const TypesList = lazy(() => import("./pages/Types/TypesList"));
const TypeEdit = lazy(() => import("./pages/Types/TypeEdit"));
const EventsEdit = lazy(() => import("./pages/Events/EventEdit"));
const CustomersList = lazy(() => import("./pages/Customer/CustomersList"));
const CustomerEdit = lazy(() => import("./pages/Customer/CustomerEdit"));
const SelectorEdit = lazy(() => import("./pages/SelectorsEdit"));
const SelectorsList = lazy(() => import("./pages/SelectorsList"));
const Login = lazy(() => import("./pages/Login"));
const Calendar = lazy(() => import("./pages/calendar"));
const PermissionsPage = lazy(() =>
  import("./pages/Permissions/PermissionsPage")
);

function App() {
  const [userRoles, setUserRoles] = useState([]);

  async function loadRoles() {
    const result = await getMenuPermissions();
    setUserRoles(result);
  }
  useEffect(() => {
    loadRoles();
  }, []);

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
            {userRoles.includes("admin") && (
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
            )}
            <Link className="nav-item" to="/events">
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
              Events
            </Link>
            {userRoles.includes("developer") && (
              <Link className="nav-item" to="/statuses">
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
                Statuses
              </Link>
            )}

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

            {userRoles.includes("admin") && (
              <Link className="nav-item" to="/badges">
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
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1 5C1 2.79086 2.79086 1 5 1H9.75736C10.8182 1 11.8356 1.42143 12.5858 2.17157L21.5858 11.1716C23.1479 12.7337 23.1479 15.2663 21.5858 16.8284L16.8284 21.5858C15.2663 23.1479 12.7337 23.1479 11.1716 21.5858L2.17157 12.5858C1.42143 11.8356 1 10.8182 1 9.75736V5ZM5 3C3.89543 3 3 3.89543 3 5V9.75736C3 10.2878 3.21071 10.7965 3.58579 11.1716L12.5858 20.1716C13.3668 20.9526 14.6332 20.9526 15.4142 20.1716L20.1716 15.4142C20.9526 14.6332 20.9526 13.3668 20.1716 12.5858L11.1716 3.58579C10.7965 3.21071 10.2878 3 9.75736 3H5Z"
                    fill="#0F0F0F"
                  />
                  <path
                    d="M9 7.5C9 8.32843 8.32843 9 7.5 9C6.67157 9 6 8.32843 6 7.5C6 6.67157 6.67157 6 7.5 6C8.32843 6 9 6.67157 9 7.5Z"
                    fill="#0F0F0F"
                  />
                </svg>
                Badges
              </Link>
            )}

            {userRoles.includes("developer") && (
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
            )}
            <Link className="nav-item" to="/Calendar">
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
                <path d="M3 4V2H5V4H3ZM3 4V6H5V4H3ZM3 4V6H5V4H3Z"></path>
                <path d="M12 3C8.34 3 6 5.67 6 8C6 10.33 8.34 13 12 13C15.66 13 18 10.33 18 8C18 5.67 15.66 3 12 3ZM12 11C9.79 11 8 9.21 8 8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 8C16 9.21 14.21 11 12 11Z"></path>
              </svg>
              Calendar
            </Link>
            {userRoles.includes("developer") && (
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
            )}
            {userRoles.includes("admin") && (
              <Link className="nav-item" to="/types">
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
                Types
              </Link>
            )}
            {userRoles.includes("admin") && (
              <Link className="nav-item" to="/permissions">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Permissions
              </Link>
            )}

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
                color="error"
                action={() => {
                  localStorage.setItem("s_id", "");
                  window.location.href = `/`;
                }}
              >
                <svg
                  className="logout-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
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
            {/* DEVELOPER */}
            {userRoles.includes("developer") && (
              <Route path="/selectors" element={<SelectorsList />} />
            )}
            {userRoles.includes("developer") && (
              <Route path="/selectors/:id" element={<SelectorEdit />} />
            )}
            {userRoles.includes("developer") && (
              <Route path="/ai-context" element={<AiContextsList />} />
            )}
            {userRoles.includes("developer") && (
              <Route path="/ai-context/:id" element={<AiContextsEdit />} />
            )}
            {userRoles.includes("developer") && (
              <Route path="/statuses" element={<StatusesList />} />
            )}
            {userRoles.includes("developer") && (
              <Route path="/status/:id" element={<StatusEdit />} />
            )}
            {/* ADMIN */}
            {userRoles.includes("admin") && (
              <Route path="/badges" element={<BadgesList />} />
            )}
            {userRoles.includes("admin") && (
              <Route path="/badges/:id" element={<BadgeEdit />} />
            )}
            {userRoles.includes("admin") && (
              <Route path="/permissions" element={<PermissionsPage />} />
            )}
            {userRoles.includes("admin") && (
              <Route path="/logs/:table_name/:id" element={<RecordLogs />} />
            )}
            {userRoles.includes("admin") && (
              <Route path="/types" element={<TypesList />} />
            )}
            {userRoles.includes("admin") && (
              <Route path="/type/:gl_events_id" element={<TypeEdit />} />
            )}
            {userRoles.includes("admin") && (
              <Route path="/users" element={<UsersList />} />
            )}
            {userRoles.includes("admin") && (
              <Route path="/users/:id" element={<UserEdit />} />
            )}

            <Route path="/events" element={<EventsList />} />
            <Route path="/event/:gl_events_id" element={<EventsEdit />} />
            <Route path="/customers" element={<CustomersList />} />
            <Route path="/customers/:id" element={<CustomerEdit />} />

            <Route path="/login" element={<Login />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

/**
 * Gets context user roles
 */
async function getMenuPermissions() {
  const result = await service.select("crm", "glMenuPermissions", {});

  return result.map((o) => o.name);
}

export default App;
