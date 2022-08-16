import "./_LogIn.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormLogin from "../../components/Form/FormLogin";
import FormSignUp from "../../components/Form/FormSignUp";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { signInWithGooglePopup, signInWithFacebookPopup } from "../../lib/auth-firebase";
import { logIn } from "../../redux/logInSlice";

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
  const dispatch = useDispatch();

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


  const signInWithGoogle = async () => {
    try {
        await signInWithGooglePopup();
        dispatch(logIn());
    } catch (error) {
        alert(error.message);
    }
};
const signInWithFacebook = async () => {
  try {
      await signInWithFacebookPopup();
      dispatch(logIn());
  } catch (error) {
      alert(error.message);
  }
};

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
            <div className="auth_providers_container">
              <Button text="login with google" icon="google" onClick={signInWithGoogle} type="google"/>
              <Button text="login with facebook" icon="facebook" onClick={signInWithFacebook} type="facebook"/>
            </div>
          </>
        )}
      </main>
    </>
  );
}
