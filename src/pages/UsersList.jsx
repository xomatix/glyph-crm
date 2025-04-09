import React from "react";
import GlTable from "../../components/glTable/glTable";
import GlList from "../../components/GlList/GlList";
import GlContainer from "../../components/GlContainer/GlContainer";
import GlRecord from "../../components/GlRecord/GlRecord";
import GlLookup from "../../components/GlLookup/GlLookup";

function UsersList() {
  return (
    <div className="users-list">
      Users Table
      <GlRecord
        nameSpace={"bookstore"}
        dataSetIdent={"booksFnAll"}
        where={{ id: 1000 }}
      >
        {(RecordContext, record) => (
          <div>
            <GlLookup
              Context={RecordContext}
              field={"title"}
              nameSpace={"bookstore"}
              dataSetIdent={"booksFnAll"}
              where={{ title: record["title"] }}
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
            <GlTable
              nameSpace={"bookstore"}
              dataSetIdent={"booksFnAll"}
              where={{ title: record["title"] }}
              onRowClick={(row) => {
                console.log("Row clicked:", row);
              }}
            />
          </div>
        )}
      </GlRecord>
      Books List
      <GlContainer>
        <GlList nameSpace={"bookstore"} dataSetIdent={"booksFnAll"}>
          {(row) => <div>{JSON.stringify(row)}</div>}
        </GlList>
      </GlContainer>
    </div>
  );
}

export default UsersList;
