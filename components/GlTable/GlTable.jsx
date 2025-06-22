import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import service from "../../glService/glService";
import "./GlTable.css";
import GlButton from "../GlButton/GlButton";
import GlModal from "../GlModal/GlModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import GlContainer from "../GlContainer/GlContainer";

const GlTable = forwardRef(
  (
    {
      nameSpace,
      dataSetIdent,
      onRowClick = () => {},
      where = {},
      headers = [], // [{label: "ID", field: "table_name_id"}]
      children,
      defaultSortConfig = {}, //{ field: field,direction: direction}
    },
    ref
  ) => {
    const [rows, setRows] = useState([]);
    const [tableHeadersLabels, setTableHeadersLabels] = useState([]);
    const [tableHeaders, setTableHeaders] = useState([]);
    const [page, setPage] = useState(1);
    const [slotMap, setSlotMap] = useState({});
    const [error, setError] = useState("");
    const [sortConfig, setSortConfig] = useState(defaultSortConfig);

    const handleSort = async (field) => {
      let direction = "asc";

      if (sortConfig.field === field) {
        if (sortConfig.direction === "asc") {
          direction = "desc";
        } else if (sortConfig.direction === "desc") {
          direction = null;
        }
      }

      setSortConfig({
        field: field,
        direction: direction,
      });
    };

    function loadSlots() {
      let formSlotMap = {};
      React.Children.forEach(children, (child) => {
        const slotName = child.props.slot;
        if (slotName) {
          formSlotMap[slotName] = child;
        }
      });
      setSlotMap(formSlotMap);
    }

    function sortByField(arr) {
      return [...arr].sort((a, b) => {
        const valA = a._ord;
        const valB = b._ord;

        if (valA == null && valB == null) return 0;
        if (valA == null) return 1;
        if (valB == null) return -1;

        return valA < valB ? -1 : valA > valB ? 1 : 0;
      });
    }

    async function refresh() {
      let response = await service.select(nameSpace, dataSetIdent, {
        page: page,
        where: where,
        order: { field: sortConfig.field, direction: sortConfig.direction },
      });
      if (response == null) {
        setRows([]);
      }
      response = sortByField(response);
      setRows(response);
      if (response.length > 0) {
        if (response.length == 1 && response[0]["error"]) {
          setError(response[0]["error"]);
          return;
        }

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
    }, [page, sortConfig.field, sortConfig.direction]);

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

          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {tableHeadersLabels.map((label, idx) => {
                  const header = tableHeaders[idx];
                  const isCurrentSort =
                    sortConfig.field === header.field &&
                    sortConfig.direction != null;

                  return (
                    <TableCell key={`${idx}`}>
                      <TableSortLabel
                        active={isCurrentSort}
                        direction={
                          isCurrentSort ? sortConfig.direction || "asc" : "asc"
                        }
                        onClick={() => handleSort(header.field)}
                        sx={{
                          "& .MuiTableSortLabel-icon": {
                            opacity: isCurrentSort ? 1 : 0,
                          },
                        }}
                      >
                        {label}
                      </TableSortLabel>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows != undefined &&
                rows.length > 0 &&
                rows.map((row, index) => (
                  <TableRow key={index} onClick={() => onRowClick(row)}>
                    {tableHeaders.map((header, idx) => (
                      <TableCell key={`${index}_${idx}`}>
                        {slotMap[header.field]
                          ? slotMap[header.field].props.children(row)
                          : row[header.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {rows.length == 0 && (
            <h3 style={{ margin: "16px 24px ", width: "100%" }}>
              No Data Found
            </h3>
          )}

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
        <GlModal
          isOpen={error.length > 0}
          title={"Error message"}
          onClose={() => setError("")}
        >
          {error}
        </GlModal>
      </div>
    );
  }
);

export default GlTable;
