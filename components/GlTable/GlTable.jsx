import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import service from "../../glService/glService";
import "./GlTable.css";
import GlButton from "../GlButton/GlButton";

const GlTable = forwardRef(
  (
    {
      nameSpace,
      dataSetIdent,
      onRowClick = () => {},
      where = {},
      headers = [], // [{label: "ID", field: "table_name_id"}]
      children,
    },
    ref
  ) => {
    const [rows, setRows] = useState([]);
    const [tableHeadersLabels, setTableHeadersLabels] = useState([]);
    const [tableHeaders, setTableHeaders] = useState([]);
    const [page, setPage] = useState(1);
    const [slotMap, setSlotMap] = useState({});

    function loadSlots() {
      let formSlotMap = {};
      React.Children.forEach(children, (child) => {
        // console.log("children ", child);
        // console.log(React.Children);

        const slotName = child.props.slot;
        if (slotName) {
          formSlotMap[slotName] = child;
        }
      });
      setSlotMap(formSlotMap);
    }

    async function refresh() {
      let response = await service.select(nameSpace, dataSetIdent, {
        page: page,
        where: where,
      });
      setRows(response);
      if (response.length > 0) {
        setTableHeaders(
          Object.keys(response[0]).map((h) => {
            return { field: h, label: h };
          })
        );
        setTableHeadersLabels(Object.keys(response[0]));
      }

      // Custom headers will override the headers from query
      if (headers.length > 0) {
        setTableHeadersLabels(headers.map((h) => h.label));
        setTableHeaders(headers);
        return;
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
      loadSlots();
      refresh();
    }, [page, where]);

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
              <GlButton
                action={() => {
                  refresh();
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </GlButton>
            </div>
          </div>

          <table>
            <colgroup>
              {tableHeadersLabels.map((_, index) => (
                <col key={index}></col>
              ))}
            </colgroup>
            <thead>
              <tr>
                {tableHeadersLabels.map((header, idx) => (
                  <th key={`${idx}`}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows != undefined &&
                rows.length > 0 &&
                rows.map((row, index) => (
                  <tr key={index} onClick={() => onRowClick(row)}>
                    {tableHeaders.map((header, idx) => (
                      <td key={`${index}_${idx}`}>
                        {slotMap[header.field]
                          ? slotMap[header.field].props.children(row)
                          : row[header.field]}
                      </td>
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
