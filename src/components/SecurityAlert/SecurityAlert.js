import "./_SecurityAlert.scss";
import LockIcon from '@mui/icons-material/Lock';
import Button from "../Button/Button";

export default function SecurityAlert({ setShowSecurityAlert }) {
  return (
    <>
      <div className="security">
        <div className="security_alert_bg"></div>
        <div className="security_container">
          <h1>Welcome to shop react app</h1>
          <div className="security_icon_info">
            {" "}
            <div className="security_icon">
              <LockIcon />
            </div>
            <h2>
              NOTE! This app has Firebase authentication implemented.
            </h2>
          </div>
          <p>
            You can sign up with your fake data.
            For overview and testing You can also use{" "}
            email: test@shop.pl & password: testshopapp
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
