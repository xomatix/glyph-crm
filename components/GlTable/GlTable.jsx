import { useEffect, useState } from "react";
import service from "../../glService/glService";
import "./GlTable.css";

function GlTable({ nameSpace, dataSetIdent, onRowClick = () => {} }) {
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [page, setPage] = useState(1);

  async function test() {
    let response = await service.select(nameSpace, dataSetIdent, {
      page: page,
    });
    setRows(response);
    if (response.length > 0) {
      setHeaders(Object.keys(response[0]));
    }
  }

  function PrevPage() {
    const calcPage = page > 1 ? page - 1 : 1;
    setPage(calcPage);
  }

  function NextPage() {
    const calcPage = page + 1;
    setPage(calcPage);
  }

  useEffect(() => {
    test();
  }, [page]);

  return (
    <div>
      <div class="table-container">
        <div class="table-header">
          <div class="table-title">Title</div>
          <div class="table-actions">
            <button onClick={() => test()} className="table-action-btn">
              <i>🔍</i>
            </button>
            <button class="table-action-btn primary">
              <i>➕</i> Dodaj nowe
            </button>
          </div>
        </div>

        <table>
          <colgroup>
            {headers.map((_, index) => (
              <col key={index}></col>
            ))}
          </colgroup>
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th key={`${idx}`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows != undefined &&
              rows.length > 0 &&
              rows.map((row, index) => (
                <tr key={index} onClick={() => onRowClick(row)}>
                  {headers.map((header, idx) => (
                    <td key={`${index}_${idx}`}>{row[header]}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>

        <div class="table-footer">
          <div class="table-info">{/* Wyświetlanie 1-5 z 25 zadań */}</div>
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
    </div>
  );
}

export default GlTable;
