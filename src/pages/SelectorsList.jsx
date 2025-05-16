import { useRef } from "react";
import GlTable from "../../components/glTable/glTable";
import { useNavigate } from "react-router";
import GlContainer from "../../components/GlContainer/GlContainer";
import GlEdit from "../../components/GlEdit/GlEdit";
import GlRecord from "../../components/GlRecord/GlRecord";
import GlRow from "../../components/GlRow/GlRow";
import GlButton from "../../components/GlButton/GlButton";

function SelectorsList() {
  const navigate = useNavigate();
  const tableRef = useRef();

  return (
    <GlContainer width="1200px">
      Selectors
      <br />
      <GlRecord initialRecord={{}}>
        {(RecordContext, record) => (
          <div>
            <GlRow>
              <GlEdit
                label={"Search"}
                field={"selector_name"}
                Context={RecordContext}
                onEnter={() => {
                  if (tableRef != null && tableRef.current != null) {
                    tableRef.current.refresh();
                  }
                }}
              />
              <GlButton
                color="primary"
                afterAction={() => {
                  navigate(`/selectors/0`);
                }}
              >
                Add new Selector
              </GlButton>
            </GlRow>
            <GlTable
              ref={tableRef}
              nameSpace={"core"}
              dataSetIdent={"selectorsFnAll"}
              onRowClick={(row) => {
                navigate(`/selectors/${row.gl_selectors_id}`);
              }}
              where={{ selector_name: record.selector_name }}
              headers={[
                // { label: "ID", field: "gl_selectors_id" },
                { label: "Namespace", field: "selector_namespace" },
                { label: "Selector name", field: "selector_name" },
                { label: "Page size", field: "page_size" },
              ]}
            />
          </div>
        )}
      </GlRecord>
    </GlContainer>
  );
}

export default SelectorsList;
