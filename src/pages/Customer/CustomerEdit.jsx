import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./CustomerEdit.css";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlButton from "../../../components/GlButton/GlButton";
import GlContainer from "../../../components/GlContainer/GlContainer";
import GlRow from "../../../components/GlRow/GlRow";
import GlList from "../../../components/GlList/GlList";
import GlLookup from "../../../components/GlLookup/GlLookup";
import Timeline from "../../../components/Timeline/Timeline";
import GlModal from "../../../components/GlModal/GlModal";
import service from "../../../glService/glService";
import {
  GetDataByNipNumber,
  PhoneNumberValidator,
  ValidateEmail,
  ValidateNIP,
} from "./Utils";

function CustomerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const badgesRef = useRef();

  const [userRoles, setUserRoles] = useState([]);
  const [error, setError] = useState("initial");

  function validateFields(record) {
    if (
      record.nip != null &&
      record.nip != undefined &&
      record.nip != "" &&
      !ValidateNIP(record.nip)
    ) {
      return "Invalid NIP number!";
    }
    if (
      record.email != null &&
      record.email != undefined &&
      record.email != "" &&
      !ValidateEmail(record.email)
    ) {
      return "Invalid email!";
    }
    let pnv = new PhoneNumberValidator();
    if (
      record.phone != null &&
      record.phone != undefined &&
      record.phone != "" &&
      !pnv.validateAdvanced(record.phone).valid
    ) {
      return "Invalid phone number!";
    }
    return "";
  }

  async function loadRoles() {
    let result = await service.select("crm", "glMenuPermissions", {});

    result = result.map((o) => o.name);
    setUserRoles(result);
  }
  useEffect(() => {
    loadRoles();
  }, []);

  return (
    <div className="container" id="customer-edit">
      <GlRecord
        dataSetIdent="glCustomersAll"
        nameSpace="crm"
        where={{ id: id }}
      >
        {(RecordContext, record) => (
          <GlContainer>
            <GlRow
              className="client-edit-row"
              style={{ alignItems: "flex-start" }}
            >
              <div className="field-group" style={{ flex: 3, minWidth: 0 }}>
                <h2>Customer Edit ID:{id}</h2>
                <h2>{record.ident} </h2>
                <GlRow>
                  <GlButton
                    color="primary"
                    record={record}
                    action={async (record) => {
                      let error = validateFields(record);
                      console.log("rec err : ", record, error);
                      setError(error);
                      if (error.length == 0) {
                        let savedRecord = await service.select(
                          "crm",
                          "glCustomersSave",
                          {
                            rows: [record],
                          }
                        );
                        savedRecord = savedRecord[0];
                        if (
                          savedRecord["gl_customers_id"] !== null &&
                          savedRecord["gl_customers_id"] !== Number(id)
                        ) {
                          navigate(
                            `/customers/${savedRecord["gl_customers_id"]}`
                          );
                        } else {
                          navigate(0);
                        }
                      }
                    }}
                  >
                    Save
                  </GlButton>
                  {id > 0 && (
                    <GlButton
                      color="error"
                      dataSetIdent="glCustomersDelete"
                      nameSpace="crm"
                      record={record}
                      afterAction={() => {
                        navigate(`/customers`);
                      }}
                    >
                      Delete
                    </GlButton>
                  )}
                  {userRoles.includes("admin") && (
                    <GlButton
                      color="info"
                      record={record}
                      action={() => {
                        navigate(`/logs/gl_customers/${id}`);
                      }}
                    >
                      Logs
                    </GlButton>
                  )}

                  <GetDataByNipNumber Context={RecordContext} />
                </GlRow>
                <GlEdit
                  field="ident"
                  label="Customer CODE"
                  Context={RecordContext}
                />
                <GlEdit field="name" Context={RecordContext} />
                <GlRow>
                  <GlEdit field="email" Context={RecordContext} />
                  <GlEdit field="phone" Context={RecordContext} />
                </GlRow>
                <GlRow>
                  <GlEdit field="city" Context={RecordContext} />
                  <GlEdit field="address" Context={RecordContext} />
                </GlRow>
                <GlRow>
                  <GlEdit
                    field="nip"
                    label="Nip"
                    type="number"
                    Context={RecordContext}
                  />
                  <GlEdit field="krs" label="Krs" Context={RecordContext} />
                  <GlEdit field="regon" label="REGON" Context={RecordContext} />
                </GlRow>
                {id > 0 && (
                  <GlRecord
                    dataSetIdent="glCustomersAll"
                    nameSpace="crm"
                    where={{ id: id }}
                  >
                    {(RecordBadgeContext, recordBadge) => (
                      <div>
                        <h2>Badges</h2>
                        <GlRow>
                          <GlLookup
                            Context={RecordBadgeContext}
                            nameSpace="crm"
                            dataSetIdent="glBadgesAll"
                            field="gl_customers_badge_id"
                            fieldInLookup="customers_badge_name"
                            label="New Badge"
                            where={{ gl_customers_id: id }}
                          >
                            {(row) => (
                              <div
                                className="badge-item"
                                style={{ backgroundColor: row.color }}
                              >
                                {row.name}
                              </div>
                            )}
                          </GlLookup>
                          <GlButton
                            nameSpace="crm"
                            size="small"
                            color="primary"
                            dataSetIdent="glCustomersBadgesSave"
                            record={recordBadge}
                            afterAction={() => {
                              if (
                                badgesRef != null &&
                                badgesRef.current != null
                              ) {
                                badgesRef.current.refresh();
                              }
                            }}
                          >
                            Add badge
                          </GlButton>
                        </GlRow>
                        <GlList
                          ref={badgesRef}
                          nameSpace="crm"
                          dataSetIdent="glCustomersBadges"
                          where={{
                            gl_customers_id: record.gl_customers_id,
                          }}
                        >
                          {(row) => (
                            <div className="badge-item">
                              <div
                                className="badge"
                                style={{ backgroundColor: row.color }}
                              >
                                {row.name}
                              </div>
                              <GlButton
                                color="error"
                                size="small"
                                nameSpace="crm"
                                dataSetIdent="glCustomersBadgesDelete"
                                record={row}
                                afterAction={() => {
                                  if (
                                    badgesRef != null &&
                                    badgesRef.current != null
                                  ) {
                                    badgesRef.current.refresh();
                                  }
                                }}
                              >
                                X
                              </GlButton>
                            </div>
                          )}
                        </GlList>
                      </div>
                    )}
                  </GlRecord>
                )}
              </div>

              <Timeline where={{ customer: id }} />

              <GlModal
                onClose={() => setError("")}
                title="Cannot save customer!"
                isOpen={error.length > 0}
              >
                {error}
              </GlModal>
            </GlRow>
          </GlContainer>
        )}
      </GlRecord>
    </div>
  );
}

export default CustomerEdit;
