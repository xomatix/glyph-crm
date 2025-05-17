import { Button, Popover } from "@mui/material";
import { useEffect, useState } from "react";
import "./AccountPopup.css";
import { Link, useNavigate } from "react-router-dom";
import GlButton from "../../../components/GlButton/GlButton";
import GlRecord from "../../../components/GlRecord/GlRecord";
import GlRow from "../../../components/GlRow/GlRow";

function AccountPopup() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [s_id, sets_id] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    sets_id(localStorage.getItem("s_id") || null);
  }, []);

  return (
    <>
      {s_id == null && (
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate("/login")}
          startIcon={
            <svg
              className="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H15M11 16L15 12M15 12L11 8M15 12H3"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
        >
          Login
        </Button>
      )}
      {s_id != null && (
        <GlRecord dataSetIdent="glAccountPopup" nameSpace="standard">
          {(RecordContext, record) => (
            <>
              <div className="account-popup-btn" onClick={handleClick}>
                <div className="avatar-circle">
                  {record.gl_username ? (
                    record.gl_username.charAt(0).toUpperCase()
                  ) : (
                    <svg
                      className="avatar-circle"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  )}
                </div>
              </div>

              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <div className="popover-content">
                  <div
                    className="user-info"
                    onClick={() => navigate(`/users/${record.gl_users_id}`)}
                  >
                    <div className="avatar-circle">
                      {record.gl_username
                        ? record.gl_username.charAt(0).toUpperCase()
                        : "A"}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500 }}>
                        {record.gl_username}
                      </div>
                      <div style={{ color: "#666", fontSize: "14px" }}>
                        {record.gl_email}
                      </div>
                    </div>
                  </div>

                  <GlButton
                    className=""
                    color="error"
                    action={() => {
                      localStorage.setItem("s_id", "");
                      window.location.href = `/`;
                    }}
                  >
                    <svg
                      className="nav-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>{" "}
                    Sign Out
                  </GlButton>
                </div>
                {/* <GlRow>
                  <svg
                    className="avatar-circle"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  {record.gl_username}
                </GlRow>

                <GlButton
                  color="error"
                  action={() => {
                    localStorage.setItem("s_id", "");
                    window.location.href = `/`;
                  }}
                >
                  <svg
                    className="nav-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </GlButton> */}
              </Popover>
            </>
          )}
        </GlRecord>
      )}
    </>
  );
}

export default AccountPopup;
