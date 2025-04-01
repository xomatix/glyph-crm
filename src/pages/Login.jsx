import React from "react";
import GlRecord from "../../components/GlRecord/GlRecord";
import GlEdit from "../../components/GlEdit/GlEdit";
import { useNavigate } from "react-router-dom";
import GlButton from "../../components/GlButton/GlButton";

function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <GlRecord initialRecord={{}}>
        {(RecordContext, record) => (
          <div>
            <h2>{record.ident}</h2>
            <GlEdit
              field="gl_username"
              label="Username"
              Context={RecordContext}
            />
            <br />
            <GlEdit
              field="gl_password"
              label="Password"
              Context={RecordContext}
            />
            <br />
            <GlButton
              dataSetIdent="userLogin"
              nameSpace="standard"
              Context={RecordContext}
              afterAction={async (record) => {
                if (record["s_id"] !== null && record["s_id"] !== "") {
                  localStorage.setItem("s_id", record["s_id"]);
                  window.location.href = `/`;
                }
              }}
            >
              Login
            </GlButton>
          </div>
        )}
      </GlRecord>
    </div>
  );
}

export default Login;
