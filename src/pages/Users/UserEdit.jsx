import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlButton from "../../../components/GlButton/GlButton";
import GlRow from "../../../components/GlRow/GlRow";
import "./UserEdit.css";
import GlList from "../../../components/GlList/GlList";
import service from "../../../glService/glService";
import GlModal from "../../../components/GlModal/GlModal";

function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const rolesListRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  function refreshRolesList() {
    if (rolesListRef != null && rolesListRef.current != null) {
      rolesListRef.current.refresh();
    }
  }

  const [menuPermissions, setMenuPermissions] = useState([]);

  useEffect(() => {
    const loadMenuPermissions = async () => {
      const permissions = await getMenuPermissions();
      setMenuPermissions(permissions);
    };
    loadMenuPermissions();
  }, []);

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
              {menuPermissions.includes("admin") && (
                <GlRow>
                  <GlButton
                    nameSpace="standard"
                    dataSetIdent="glUsersSave"
                    color="primary"
                    record={record}
                    afterAction={() => {
                      navigate(0);
                    }}
                  >
                    Save
                  </GlButton>
                  <GlButton
                    className=""
                    afterAction={() => {
                      navigate("/users");
                    }}
                  >
                    Close
                  </GlButton>
                </GlRow>
              )}
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
              <GlButton color="secondary" action={() => setShowPassword(true)}>
                Change password
              </GlButton>
              <GlModal
                isOpen={showPassword}
                onClose={() => setShowPassword(false)}
                title={"Change password"}
              >
                <GlEdit
                  Context={RecordContext}
                  field={"gl_password"}
                  label={"Password"}
                  type="text"
                />
                <GlEdit
                  Context={RecordContext}
                  field={"gl_password_2"}
                  label={"Confirm Password"}
                  type="text"
                />
                <GlRow>
                  <GlButton
                    color="error"
                    record={record}
                    afterAction={() => {
                      setShowPassword(false);
                    }}
                  >
                    Close
                  </GlButton>
                  {record["gl_password_2"] == record["gl_password"] && (
                    <GlButton
                      nameSpace="standard"
                      dataSetIdent="glUsersSave"
                      color="success"
                      record={record}
                      afterAction={() => {
                        navigate(0);
                      }}
                    >
                      Save changes
                    </GlButton>
                  )}
                </GlRow>
              </GlModal>
              {menuPermissions.includes("admin") && (
                <GlEdit
                  type="switch"
                  Context={RecordContext}
                  field="is_active"
                  label={"Active"}
                />
              )}
              {menuPermissions.includes("admin") && (
                <div className="role-list">
                  <GlList
                    ref={rolesListRef}
                    nameSpace="standard"
                    dataSetIdent="glUsersRolesLink"
                    where={{ gl_users_id: id }}
                    onClick={async (row) => {
                      if (row.gl_users_roles_link_id == null) {
                        await service.select(
                          "standard",
                          "glUsersRolesLinkSave",
                          {
                            rows: [row],
                            where: { gl_users_id: id },
                          }
                        );
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
              )}
            </div>
          </GlContainer>
        )}
      </GlRecord>
    </div>
  );
}

async function getMenuPermissions() {
  const result = await service.select("crm", "glMenuPermissions", {});

  return result.map((o) => o.name);
}

export default UserEdit;
