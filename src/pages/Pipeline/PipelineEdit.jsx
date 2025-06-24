import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlButton from "../../../components/GlButton/GlButton";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlRow from "../../../components/GlRow/GlRow";
import GlModal from "../../../components/GlModal/GlModal";
import GlLookup from "../../../components/GlLookup/GlLookup";
import service from "../../../glService/glService";

const PipelineEdit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [pipelineId, setPipelineId] = useState(Number(params.id));

  useEffect(() => {
    setPipelineId(Number(params.id));
  }, [params.id]);

  const [userRoles, setUserRoles] = useState([]);
  const [showUserAssign, setShowUserAssign] = useState(false);

  useEffect(() => {
    const loadRoles = async () => {
      const result = await service.select("crm", "glMenuPermissions", {});
      setUserRoles(result.map((o) => o.name));
    };
    loadRoles();
  }, []);

  const canEdit = userRoles.includes("Sales Manager") || userRoles.includes("admin");

  return (
    <div className="container p-4">
      <GlRecord
        key={pipelineId} 
        dataSetIdent="GlSalesPipelineAll"
        nameSpace="crm"
        where={{ gl_sales_pipeline_id: pipelineId }}
      >
        {(Context, record) => {
          if (!record) return <div>Loading...</div>;

          return (
            <GlContainer>
              <GlRow>
                {canEdit && (
                  <>
                    <GlButton
                      color="primary"
                      dataSetIdent="glSalesPipelineSave"
                      nameSpace="crm"
                      record={record}
                      Context={Context}
                      afterAction={(r) => {
                        if (
                          r.gl_sales_pipeline_id &&
                          r.gl_sales_pipeline_id !== pipelineId
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
                      Context={Context}
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
                  <GlButton color="secondary" action={() => setShowUserAssign(true)}>
                    Assign Owner
                  </GlButton>
                )}

                {userRoles.includes("admin") && (
                  <GlButton
                    color="info"
                    action={() =>
                      navigate(`/logs/gl_sales_pipeline/${pipelineId}`)
                    }
                  >
                    Logs
                  </GlButton>
                )}
              </GlRow>

              <GlEdit field="title" label="Title" Context={Context} />
              <GlEdit field="description" label="Description" type="text" Context={Context} />

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
          );
        }}
      </GlRecord>
    </div>
  );
};

export default PipelineEdit;
