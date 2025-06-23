import GlRecord from "../../../components/GlRecord/GlRecord";
import GlEdit from "../../../components/GlEdit/GlEdit";
import GlButton from "../../../components/GlButton/GlButton";
import styles from "./Login.module.css";
import GlRow from "../../../components/GlRow/GlRow";

function Login() {
  return (
    <div>
      <GlRecord initialRecord={{}}>
        {(RecordContext, record) => (
          <div className={styles.container}>
            <div className={styles.formContainer}>
              <h2 className={styles.title}>Log In</h2>
              <div>
                <div className={styles.inputGroup}>
                  <GlEdit
                    field="gl_username"
                    label="Username"
                    Context={RecordContext}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <GlEdit
                    type="password"
                    field="gl_password"
                    label="Password"
                    Context={RecordContext}
                  />
                </div>
                <GlRow>
                  <GlButton
                    className={styles.button}
                    dataSetIdent="userLogin"
                    nameSpace="standard"
                    color="primary"
                    record={record}
                    afterAction={async (record) => {
                      if (record["s_id"] !== null && record["s_id"] !== "") {
                        localStorage.setItem("s_id", record["s_id"]);
                        window.location.href = "/";
                      }
                    }}
                  >
                    Login
                  </GlButton>
                </GlRow>
              </div>
            </div>
          </div>
        )}
      </GlRecord>
    </div>
  );
}

export default Login;
