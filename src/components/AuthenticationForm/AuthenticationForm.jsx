import React, { useRef, useState } from "react";
import "./AuthenticationForm.css";
import { userLogin } from "../../apis/users";
import { useNavigate } from "react-router-dom";

const AuthenticationForm = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData(formRef.current);
    var body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const result = await userLogin(body);
    localStorage.setItem("user", JSON.stringify(result?.user));
    setTimeout(() => {
      setLoader(false);
      navigate(`/users/${result?.user?.id}`);
    }, 1500);
  }

  const formRef = useRef(null);

  return (
    <div className="auth-form">
      <div className="auth-form-header">Login</div>
      <div className="auth-form-body">
        <form ref={formRef} onSubmit={submitHandler}>
          <div>
            <input type="email" name="email" placeholder="abc@gmail.com" />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="false"
            />
          </div>
          <div className="auth-form-footer">
            <button type="submit" className="submit-btn">
              {!loader ? "Login" : "Login..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthenticationForm;
