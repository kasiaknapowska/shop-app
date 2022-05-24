import "./_SecurityAlert.scss";
import NoEncryptionIcon from "@mui/icons-material/NoEncryption";
import Button from "../Button/Button";

export default function SecurityAlert({ setShowSecurityAlert }) {
  return (
    <>
      <div className="security">
        <div className="security_alert_bg"></div>
        <div className="security_container">
          <h1>Thank You for visiting shop react app</h1>
          <div className="security_icon_info">
            {" "}
            <div className="no_security_icon">
              <NoEncryptionIcon />
            </div>
            <h2>
              NOTE! This app has a security vulnerability according to no
              authentication provided to sign in & log in forms yet.
            </h2>
          </div>
          <p>
            For registration use <strong>fake personal data</strong> only.
            For overview and testing You can use{" "}
            email: test@gmail.com & password: testshopapp
          </p>
          <Button
            text="got it"
            type="primary"
            icon="accept"
            onClick={() => setShowSecurityAlert(false)}
          />
        </div>
      </div>
    </>
  );
}
