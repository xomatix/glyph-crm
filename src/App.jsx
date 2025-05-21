  import "./App.css";
  import { lazy, Suspense, useEffect } from "react";
  import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
  import AiContextsEdit from "./pages/AiContextsEdit";
  import RecordLogs from "./pages/RecordLogs/RecordsLogs";
  import service from "../glService/glService";
  import { useState } from "react";
  import Navbar from "./pages/Navbar/Navbar";
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
  const Login = lazy(() => import("./pages/Login/Login"));
  const Calendar = lazy(() => import("./pages/Calendar"));
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
          <Navbar />
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

              <Route path="/users/:id" element={<UserEdit />} />

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