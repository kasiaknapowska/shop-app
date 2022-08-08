import "./_LogIn.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../lib/func-firebase";
import { useSelector, useDispatch } from "react-redux";
import { resetData } from "../../redux/userSlice";
import FormLogin from "../../components/Form/FormLogin";
import FormSignUp from "../../components/Form/FormSignUp";

export default function LogIn() {
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [users, setUsers] = useState([]);

  const loggedIn = useSelector((state) => state.logIn.loggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers((response) => {
      const usersFromFirebase = response.docs.map((doc) => ({
        email: doc.data().email,
        password: doc.data().password,
        name: doc.data().name,
        surname: doc.data().surname,
        phone: doc.data().phone,
        street: doc.data().street,
        streetNumber: doc.data().streetNumber,
        zipCode: doc.data().zipCode,
        city: doc.data().city,
        orders: doc.data().orders,
        id: doc.id,
      }));
      setUsers(usersFromFirebase);
    });
  }, []);

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
    if (loggedIn) {
      navigate("/user");
    } else {
      dispatch(resetData());
    }
  }, [loggedIn]);

  return (
    <>
      <main className="container">
        {!loggedIn && (
          <>
            {!isSignUpFormOpen ? <h1>Log in</h1> : <h1>Sign up</h1>}
            {!isSignUpFormOpen ? (
              <FormLogin
                formData={formData}
                users={users}
                onInputChange={onInputChange}
              />
            ) : (
              <FormSignUp
                formData={formData}
                onInputChange={onInputChange}
                users={users}
                setUsers={setUsers}
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
