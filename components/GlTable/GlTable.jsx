import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import service from "../../glService/glService";
import "./GlTable.css";

const GlTable = forwardRef(
  ({ nameSpace, dataSetIdent, onRowClick = () => {}, where = {} }, ref) => {
    const [rows, setRows] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [page, setPage] = useState(1);

    async function refresh() {
      let response = await service.select(nameSpace, dataSetIdent, {
        page: page,
        where: where,
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
      refresh();
    }, [page]);

    useImperativeHandle(ref, () => ({
      refresh: async () => {
        await refresh();
        console.log("refresh table called with args: ", where);
      },
    }));

    return (
      <div>
        <div class="table-container">
          <div class="table-header">
            <div class="table-title">Title</div>
            <div class="table-actions">
              <button onClick={() => refresh()} className="table-action-btn">
                <i>🔍</i>
              </button>
              <button className="table-action-btn primary">
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

          <div className="table-footer">
            <div className="table-info">
              {/* Wyświetlanie 1-5 z 25 zadań */}
            </div>
            <div className="pagination">
              <button onClick={() => PrevPage()} className="page-btn">
                ◀
              </button>
              <button className="page-btn">{page}</button>
              <button onClick={() => NextPage()} className="page-btn">
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default GlTable;
