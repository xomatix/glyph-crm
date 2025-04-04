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
      <GlTable
        nameSpace={"bookstore"}
        dataSetIdent={"booksFnAll"}
        onRowClick={(row) => {
          console.log("Row clicked:", row);
        }}
      />
      <GlRecord
        nameSpace={"bookstore"}
        dataSetIdent={"booksFnAll"}
        where={{ id: 1000 }}
      >
        {(RecordContext, record) => (
          <div>
            <GlLookup
              Context={RecordContext}
              field={"code"}
              nameSpace={"bookstore"}
              dataSetIdent={"booksFnAll"}
              where={{ title: record["title"] }}
            >
              {(row) => <div>{row["code"]}</div>}
            </GlLookup>
            <p>{JSON.stringify(record)}</p>
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
