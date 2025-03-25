import GlEdit from "../components/GlEdit/GlEdit";
import GlRecord from "../components/GlRecord/GlRecord";
import GlTable from "../components/glTable/glTable";
import "./App.css";
import GlButton from "../components/GlButton/GlButton";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import UsersList from "./pages/UsersList";
import CustomersList from "./pages/CustomersList";
import CustomerEdit from "./pages/CustomerEdit";
import SelectorEdit from "./pages/SelectorsEdit";
import SelectorsList from "./pages/SelectorsList";

function App() {
  return (
    <>
      <h1>glyph CRM Navbar</h1>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/selectors">Selectors</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h2>Home Page</h2>} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/customers" element={<CustomersList />} />
          <Route path="/customers/:id" element={<CustomerEdit />} />
          <Route path="/selectors" element={<SelectorsList />} />
          <Route path="/selectors/:id" element={<SelectorEdit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
