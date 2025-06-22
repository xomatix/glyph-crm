
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlButton from "../../../components/GlButton/GlButton";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlRow from "../../../components/GlRow/GlRow";
import GlLookup from "../../../components/GlLookup/GlLookup";
import GlModal from "../../../components/GlModal/GlModal";
import service from "../../../glService/glService";

const PipelineEdit = () => {
  const { gl_sales_pipeline_id } = useParams();
  const navigate = useNavigate();
  const [userRoles, setUserRoles] = useState([]);
  const [showUserAssign, setShowUserAssign] = useState(false);

  useEffect(() => {
    const loadRoles = async () => {
      let result = await service.select("crm", "glMenuPermissions", {});
      setUserRoles(result.map((o) => o.name));
    };
    loadRoles();
  }, []);

  const canEdit = userRoles.includes("Sales Manager") || userRoles.includes("admin");

  return (
    <div className="container p-4">
      <GlRecord
        dataSetIdent="GlSalesPipelineAll"
        nameSpace="crm"
        where={{ gl_sales_pipeline_id }}
      >
        {(Context, record) => (
          <GlContainer>
            <GlRow>
              {gl_sales_pipeline_id != 0 && (
                <>
                  {canEdit && (
                    <>
                      <GlButton
                        color="primary"
                        dataSetIdent="glSalesPipelineSave"
                        nameSpace="crm"
                        record={record}
                        afterAction={(r) => {
                          if (
                            r.gl_sales_pipeline_id &&
                            r.gl_sales_pipeline_id !== Number(gl_sales_pipeline_id)
                          ) {
                            navigate(`/pipeline/${r.gl_sales_pipeline_id}`);
                          } else {
                            navigate(0);
                          }
                        }}
                      >
                        Save
                      </GlButton>

                      <GlButton
                        color="error"
                        dataSetIdent="glSalesPipelineDelete"
                        nameSpace="crm"
                        record={record}
                        afterAction={() => {
                          navigate(`/pipeline`);
                        }}
                      >
                        Delete
                      </GlButton>
                    </>
                  )}

                  <GlButton action={() => navigate(-1)}>Close</GlButton>

                  {canEdit && (
                    <GlButton
                      color="secondary"
                      action={() => setShowUserAssign(true)}
                    >
                      Assign Owner
                    </GlButton>
                  )}

                  {userRoles.includes("admin") && (
                    <GlButton
                      color="info"
                      action={() =>
                        navigate(`/logs/gl_sales_pipeline/${gl_sales_pipeline_id}`)
                      }
                    >
                      Logs
                    </GlButton>
                  )}
                </>
              )}

              {gl_sales_pipeline_id == 0 && canEdit && (
                <>
                  <GlButton
                    color="primary"
                    dataSetIdent="glSalesPipelineSave"
                    nameSpace="crm"
                    record={record}
                    afterAction={(r) => {
                      navigate(`/pipeline/${r.gl_sales_pipeline_id}`);
                    }}
                  >
                    Save
                  </GlButton>
                  <GlButton action={() => navigate(-1)}>Close</GlButton>
                </>
              )}
            </GlRow>

            {/* Fields */}
            <GlEdit field="title" label="Title" Context={Context} />
            <GlEdit field="description" label="Description" Context={Context} />

            <GlLookup
              dataSetIdent="gl_customers"
              nameSpace="crm"
              Context={Context}
              field={"customer"}
              fieldInLookup={"ident"}
              label="Customer"
            >
              {(row) => <div>{row.ident}</div>}
            </GlLookup>

            <GlLookup
              dataSetIdent="gl_users"
              nameSpace="crm"
              Context={Context}
              field={"user"}
              fieldInLookup={"gl_username"}
              label="Assigned User"
            >
              {(row) => <div>{row.gl_username}</div>}
            </GlLookup>

            <GlLookup
              dataSetIdent="gl_sales_pipeline_stage"
              nameSpace="crm"
              Context={Context}
              field={"stage"}
              fieldInLookup={"stagename"}
              label="Stage"
            >
              {(row) => <div>{row.stagename}</div>}
            </GlLookup>

            <GlLookup
              dataSetIdent="gl_sales_pipeline_status"
              nameSpace="crm"
              Context={Context}
              field={"status"}
              fieldInLookup={"statusname"}
              label="Status"
            >
              {(row) => <div>{row.statusname}</div>}
            </GlLookup>

            <GlLookup
              dataSetIdent="gl_sales_pipeline_type"
              nameSpace="crm"
              Context={Context}
              field={"type"}
              fieldInLookup={"typename"}
              label="Type"
            >
              {(row) => <div>{row.typename}</div>}
            </GlLookup>

            {/* Modal for assigning owner */}
            <GlModal
              isOpen={showUserAssign}
              onClose={() => setShowUserAssign(false)}
              title="Assign Owner"
            >
              <GlLookup
                dataSetIdent="glUsersSalesRep"
                nameSpace="crm"
                Context={Context}
                field={"user"}
                fieldInLookup={"gl_username"}
                label="Sales Rep"
              >
                {(row) => <div>{row.gl_username}</div>}
              </GlLookup>
            </GlModal>
          </GlContainer>
        )}
      </GlRecord>
    </div>
  );
};

export default PipelineEdit;