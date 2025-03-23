import GlEdit from "../components/GlEdit/GlEdit";
import GlRecord from "../components/GlRecord/GlRecord";
import GlTable from "../components/glTable/glTable";
import "./App.css";
import GlButton from "../components/GlButton/GlButton";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import UsersList from "./pages/UsersList";
import CustomersList from "./pages/CustomersList";
import CustomerEdit from "./pages/CustomerEdit";

function App() {
  const selectedRecord = {
    books_id: 1001,
    gl_companies_id: 1,
    title: "witek_autor_kon_z_walony",
  };

  return (
    <>
      <h1>glyph CRM Navbar</h1>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
          <Link to="/customers">Customers</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h2>Home Page</h2>} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/customers" element={<CustomersList />} />
          <Route path="/customers/:id" element={<CustomerEdit />} />
        </Routes>
      </BrowserRouter>

      {/* <GlRecord initialRecord={selectedRecord}>
        {(RecordContext) => (
          <div>
            <h2>Book</h2>
            <label>
              ID: <GlEdit field="books_id" Context={RecordContext} />
            </label>
            <br />
            <label>
              Title: <GlEdit field="title" Context={RecordContext} />
            </label>
            <br />
            <GlButton
              action={(record) => {
                console.log("Record data:", record);
              }}
              Context={RecordContext}
            >
              Save
            </GlButton>
          </div>
        )}
      </GlRecord> */}
    </>
  );
}

export default App;
