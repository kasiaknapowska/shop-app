import "./_LogIn.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormLogin from "../../components/Form/FormLogin";
import FormSignUp from "../../components/Form/FormSignUp";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const loggedIn = useSelector((state) => state.logIn.loggedIn);
  const currentUserId = useSelector((state) => state.user.currentUser.uid);
  const navigate = useNavigate();

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (loggedIn && currentUserId) {
    navigate(`/user/${currentUserId}`)
    }
  }, [loggedIn, currentUserId])

  return (
    <>
      <main className="container">
        {!loggedIn && (
          <>
            {!isSignUpFormOpen ? <h1>Log in</h1> : <h1>Sign up</h1>}
            {!isSignUpFormOpen ? (
              <FormLogin
                formData={formData}
                onInputChange={onInputChange}
              />
            ) : (
              <FormSignUp
                formData={formData}
                onInputChange={onInputChange}
              />
            )}
            {!isSignUpFormOpen ? (
              <h2 className="change_form">
                Don't have an account yet?&nbsp;&nbsp;
                <span className="change_form_link" onClick={() => setIsSignUpFormOpen(true)}>Sign up</span>
              </h2>
            ) : (
              <h2 className="change_form">
                Already have an account?&nbsp;&nbsp;
                <span className="change_form_link" onClick={() => setIsSignUpFormOpen(false)}>Log in</span>
              </h2>
            )}
          </>
        )}
      </main>
    </>
  );
}
