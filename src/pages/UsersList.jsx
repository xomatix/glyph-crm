import React, { useRef } from "react";
import GlTable from "../../components/glTable/glTable";
import GlList from "../../components/GlList/GlList";
import GlContainer from "../../components/GlContainer/GlContainer";
import GlRecord from "../../components/GlRecord/GlRecord";
import GlLookup from "../../components/GlLookup/GlLookup";

function UsersList() {
  const booksTableRef = useRef();

  return (
    <div className="users-list">
      Users Table
      <GlRecord
        nameSpace={"bookstore"}
        dataSetIdent={"booksFnAll"}
        afterChange={() => {
          console.log("after record refreshed");

          if (booksTableRef != null && booksTableRef.current != null) {
            booksTableRef.current.refresh();
          }
        }}
      >
        {(RecordContext, record) => (
          <div>
            <div className="filters">
              <GlLookup
                style={{ width: "300px" }}
                className="className"
                Context={RecordContext}
                field={"books_id"}
                nameSpace={"bookstore"}
                dataSetIdent={"booksFnAll"}
                // where={{ title: record["title"] }}
                onClick={() => {
                  console.log("after click");
                }}
              >
                {(row) => (
                  <div>
                    {row["code"]}({row["title"]})
                  </div>
                )}
              </GlLookup>
              <p>
                {JSON.stringify(record)}
                {record["books_id"]}
              </p>
            </div>
            <GlTable
              ref={booksTableRef}
              nameSpace={"bookstore"}
              dataSetIdent={"booksFnAll"}
              where={{ id: record["books_id"] }}
              onRowClick={(row) => {
                console.log("Row clicked:", row);
              }}
            />
          </div>
        )}
      </GlRecord>
      Books List
      <GlContainer>
        {/* <GlList nameSpace={"bookstore"} dataSetIdent={"booksFnAll"}>
          {(row) => <div>{JSON.stringify(row)}</div>}
        </GlList> */}
      </GlContainer>
    </div>
  );
}

export default UsersList;
