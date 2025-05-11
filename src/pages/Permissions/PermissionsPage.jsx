import React, { useRef, useState } from "react";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlList from "../../../components/GlList/GlList";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import "./PermissionsPage.css";
import GlModal from "../../../components/GlModal/GlModal";
import GlButton from "../../../components/GlButton/GlButton";
import GlRow from "../../../components/GlRow/GlRow";
import service from "../../../glService/glService";

function PermissionsPage() {
  const rolesListRef = useRef();
  const permissionsListRef = useRef();
  const rolePermLinkListRef = useRef();
  const [permissionId, setPermissionId] = useState(null);
  const [roleId, setRoleId] = useState(null);

  const refreshPermissions = () => {
    if (permissionsListRef != null && permissionsListRef.current != null) {
      permissionsListRef.current.refresh();
    }
  };
  const refreshRoles = () => {
    if (rolesListRef != null && rolesListRef.current != null) {
      rolesListRef.current.refresh();
    }
  };
  const refreshPermRoleLink = () => {
    console.log(rolePermLinkListRef);
    if (rolePermLinkListRef != null && rolePermLinkListRef.current != null) {
      rolePermLinkListRef.current.refresh();
    }
  };

  return (
    <GlContainer>
      <h1>PermissionsPage</h1>
      <h2>Roles</h2>
      <GlRecord
        nameSpace={"standard"}
        dataSetIdent={"glUsersRoles"}
        where={{ gl_users_roles_id: 0 }}
      >
        {(RecordContext, record) => (
          <div className="modal-record">
            <GlEdit Context={RecordContext} field={"name"} />
            <GlButton
              record={record}
              nameSpace="standard"
              dataSetIdent="glUserRolesSave"
              className="info"
              afterAction={() => {
                refreshRoles();
              }}
            >
              Add
            </GlButton>
            <GlList
              ref={rolesListRef}
              nameSpace={"standard"}
              dataSetIdent={"glUsersRoles"}
              onClick={(row) => {
                setRoleId(row.gl_users_roles_id);
              }}
            >
              {(row) => <div>{row.name}</div>}
            </GlList>
          </div>
        )}
      </GlRecord>
      <GlModal
        isOpen={roleId != null}
        onClose={() => {
          setRoleId(null);
        }}
        title={"Edit role"}
      >
        <GlRecord
          nameSpace={"standard"}
          dataSetIdent={"glUsersRoles"}
          where={{ gl_users_roles_id: roleId }}
        >
          {(RecordContext, record) => (
            <div className="modal-record role-list">
              <GlEdit Context={RecordContext} field="name" />
              <GlEdit
                Context={RecordContext}
                field="permission_name"
                label={"search permission"}
                onBlur={() => refreshPermRoleLink()}
              />
              <GlList
                ref={rolePermLinkListRef}
                nameSpace="standard"
                dataSetIdent="glPermissions"
                where={{
                  gl_users_roles_id: roleId,
                  name: record.permission_name,
                }}
                onClick={async (row) => {
                  if (row.gl_users_roles_id != null)
                    await service.select(
                      "standard",
                      "glPermissionsRolesLinkDelete",
                      {
                        rows: [
                          {
                            gl_permissions_roles_link_id:
                              row.gl_permissions_roles_link_id,
                          },
                        ],
                      }
                    );
                  else
                    await service.select(
                      "standard",
                      "glPermissionsRolesLinkSave",
                      {
                        rows: [
                          {
                            gl_permissions_id: row.gl_permissions_id,
                            gl_users_roles_id: roleId,
                          },
                        ],
                      }
                    );
                  refreshPermRoleLink();
                }}
              >
                {(row) => (
                  <div className="role-list-item">
                    {row.name}
                    <input
                      className="role-set-checkbox"
                      type="checkbox"
                      checked={row.gl_users_roles_id != null}
                    />
                  </div>
                )}
              </GlList>
              <GlRow>
                <GlButton
                  nameSpace="standard"
                  dataSetIdent="glUsersRolesDelete"
                  className="danger"
                  record={record}
                  afterAction={() => {
                    setRoleId(null);
                    refreshRoles();
                  }}
                >
                  Delete
                </GlButton>
                <GlButton
                  record={record}
                  nameSpace="standard"
                  dataSetIdent="glUserRolesSave"
                  className="success"
                  afterAction={() => {
                    setRoleId(null);
                    refreshRoles();
                  }}
                >
                  Save
                </GlButton>
              </GlRow>
            </div>
          )}
        </GlRecord>
      </GlModal>

      <h2>Permissions</h2>
      <GlRecord
        nameSpace={"standard"}
        dataSetIdent={"glPermissions"}
        where={{ gl_permissions_id: 0 }}
      >
        {(RecordContext, record) => (
          <div className="modal-record">
            <GlEdit Context={RecordContext} field={"name"} />
            <GlButton
              record={record}
              nameSpace="standard"
              dataSetIdent="glPermissionsSave"
              className="info"
              afterAction={() => {
                refreshPermissions();
              }}
            >
              Add
            </GlButton>
            <GlList
              ref={permissionsListRef}
              nameSpace={"standard"}
              dataSetIdent={"glPermissions"}
              onClick={(row) => {
                setPermissionId(row.gl_permissions_id);
              }}
            >
              {(row) => <div>{row.name}</div>}
            </GlList>
          </div>
        )}
      </GlRecord>

      <GlModal
        isOpen={permissionId != null}
        onClose={() => {
          setPermissionId(null);
        }}
        title={"Edit permission"}
      >
        <GlRecord
          nameSpace={"standard"}
          dataSetIdent={"glPermissions"}
          where={{ gl_permissions_id: permissionId }}
        >
          {(RecordContext, record) => (
            <div className="modal-record">
              <GlEdit Context={RecordContext} field="name" />

              <GlRow>
                <GlButton
                  nameSpace="standard"
                  dataSetIdent="glPermissionsDelete"
                  className="danger"
                  record={record}
                  afterAction={() => {
                    setPermissionId(null);
                    refreshPermissions();
                  }}
                >
                  Delete
                </GlButton>
                <GlButton
                  record={record}
                  nameSpace="standard"
                  dataSetIdent="glPermissionsSave"
                  className="success"
                  afterAction={() => {
                    setPermissionId(null);
                    refreshPermissions();
                  }}
                >
                  Save
                </GlButton>
              </GlRow>
            </div>
          )}
        </GlRecord>
      </GlModal>
    </GlContainer>
  );
}

export default PermissionsPage;
