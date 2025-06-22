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
  const [error, setError] = useState("");

  const xIcon = `<svg 
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlns:xlink="http://www.w3.org/1999/xlink"
                                      fill="#f0f0f0"
                                      height="10"
                                      width="10"
                                      version="1.1"
                                      id="Capa_1"
                                      viewBox="0 0 460.775 460.775"
                                      xml:space="preserve"
                                    >
                                      <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                                    </svg>`;

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
                                <GlRow>
                                  {row.name}
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
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: xIcon,
                                      }}
                                    />
                                  </GlButton>
                                </GlRow>
                              </div>
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
