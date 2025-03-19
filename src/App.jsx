import GlTable from "../components/glTable/glTable";
import "./App.css";

function App() {
  return (
    <>
      <h1>glyph CRM</h1>
      <GlTable nameSpace={"bookstore"} dataSetIdent={"booksFnAll"}></GlTable>
    </>
  );
}

export default App;
