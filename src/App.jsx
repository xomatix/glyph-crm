import "./App.css";
import { lazy, Suspense } from "react";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import AiContextsEdit from "./pages/AiContextsEdit";
import GlButton from "../components/GlButton/GlButton";
const AiContextsList = lazy(() => import("./pages/AiContextsList"));
const UsersList = lazy(() => import("./pages/UsersList"));
const CustomersList = lazy(() => import("./pages/CustomersList"));
const CustomerEdit = lazy(() => import("./pages/CustomerEdit"));
const SelectorEdit = lazy(() => import("./pages/SelectorsEdit"));
const SelectorsList = lazy(() => import("./pages/SelectorsList"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <>
      <BrowserRouter>
        <h1>glyph CRM Navbar</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/selectors">Selectors</Link>
          <Link to="/ai-context">AI Context</Link>
          {localStorage.getItem("s_id") === "" && (
            <Link to="/login">Login</Link>
          )}
          {localStorage.getItem("s_id") !== "" && (
            <GlButton
              action={() => {
                localStorage.setItem("s_id", "");
                window.location.href = `/`;
              }}
            >
              Logout
            </GlButton>
          )}
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
