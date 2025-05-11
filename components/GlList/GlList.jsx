import { useEffect, useImperativeHandle, useState, forwardRef } from "react";
import service from "../../glService/glService";
import "./GlList.css";

const GlList = forwardRef(
  (
    { nameSpace, dataSetIdent, children, onClick = () => {}, where = {} },
    ref
  ) => {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);

    const refresh = async () => {
      let response = await service.select(nameSpace, dataSetIdent, {
        page: page,
        where: where,
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
      refresh();
    }, [page]);

    useImperativeHandle(ref, () => ({
      refresh: async () => {
        await refresh();
        console.log("refresh table called with args: ", where);
      },
    }));

    return (
      <div className="list-container">
        {rows != undefined &&
          rows.length > 0 &&
          rows.map((row) => (
            <div onClick={() => onClick(row)} className="list-item">
              {children(row)}
            </div>
          ))}
        {rows == undefined ||
          (rows.length == 0 && (
            <div className="no-records">No records found</div>
          ))}
        <div className="list-footer">
          <div className="list-info">{/* Wyświetlanie 1-5 z 25 zadań */}</div>
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
    );
  }
);

export default GlList;
