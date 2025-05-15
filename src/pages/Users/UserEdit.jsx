import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlButton from "../../../components/GlButton/GlButton";
import GlRow from "../../../components/GlRow/GlRow";
import "./UserEdit.css";
import GlList from "../../../components/GlList/GlList";
import service from "../../../glService/glService";

function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const rolesListRef = useRef();

  function refreshRolesList() {
    if (rolesListRef != null && rolesListRef.current != null) {
      rolesListRef.current.refresh();
    }
  }

  return (
    <div className="container">
      <GlRecord
        nameSpace="standard"
        dataSetIdent="glUsersAll"
        where={{ gl_users_id: id }}
      >
        {(RecordContext, record) => (
          <GlContainer>
            <div className="field-group">
              UserEdit {id}
              <GlRow>
                {/* <GlButton
                nameSpace="standard"
                dataSetIdent="glUsersRolesDelete"
                className="success"
                record={record}
                afterAction={() => {
                  // setRoleId(null);
                  // refreshRoles();
                }}
              >
                Save
              </GlButton> */}
                <GlButton
                  className=""
                  afterAction={() => {
                    navigate("/users");
                  }}
                >
                  Close
                </GlButton>
              </GlRow>
              <GlEdit
                Context={RecordContext}
                field="gl_users_id"
                readOnly="true"
                label={"ID"}
              />
              <GlEdit
                Context={RecordContext}
                field="gl_username"
                readOnly="true"
                label={"Username"}
              />
              <GlEdit
                Context={RecordContext}
                field="gl_email"
                label={"Email"}
              />
              <div className="role-list">
                <GlList
                  ref={rolesListRef}
                  nameSpace="standard"
                  dataSetIdent="glUsersRolesLink"
                  where={{ gl_users_id: id }}
                  onClick={async (row) => {
                    if (row.gl_users_roles_link_id == null) {
                      await service.select("standard", "glUsersRolesLinkSave", {
                        rows: [row],
                        where: { gl_users_id: id },
                      });
                    } else {
                      await service.select(
                        "standard",
                        "glUsersRolesLinkDelete",
                        {
                          rows: [row],
                        }
                      );
                    }
                    refreshRolesList();
                  }}
                >
                  {(row) => (
                    <div className="role-list-item">
                      {row.name}
                      <input
                        className="role-set-checkbox"
                        type="checkbox"
                        checked={row.gl_users_roles_link_id != null}
                      />
                    </div>
                  )}
                </GlList>
              </div>
            </div>
          </GlContainer>
        )}
      </GlRecord>
    </div>
  );
}

export default UserEdit;
