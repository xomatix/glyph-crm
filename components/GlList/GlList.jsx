import { useEffect, useState } from "react";
import service from "../../glService/glService";

function GlList({ nameSpace, dataSetIdent, children }) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);

  const loadListData = async () => {
    let response = await service.select(nameSpace, dataSetIdent, {
      page: page,
    });
    setRows(response);
  };

  function PrevPage() {
    const calcPage = page > 1 ? page - 1 : 1;
    setPage(calcPage);
  }

  function NextPage() {
    const calcPage = page + 1;
    setPage(calcPage);
  }

  useEffect(() => {
    loadListData();
  }, [page]);

  return (
    <div className="list-container">
      {rows != undefined &&
        rows.length > 0 &&
        rows.map((row) => <div className="list-item">{children(row)}</div>)}
      {rows == undefined ||
        (rows.length == 0 && (
          <div className="no-records">No records found</div>
        ))}
      <div class="table-footer">
        <div class="list-info">{/* Wyświetlanie 1-5 z 25 zadań */}</div>
        <div class="pagination">
          <button onClick={() => PrevPage()} class="page-btn">
            ◀
          </button>
          {/* <button class="page-btn active">1</button> */}
          {/* <button class="page-btn">2</button> */}
          <button class="page-btn">{page}</button>
          <button onClick={() => NextPage()} class="page-btn">
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}

export default GlList;
