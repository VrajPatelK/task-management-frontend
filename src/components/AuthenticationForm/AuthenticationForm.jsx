import React, { useRef } from "react";
import "./AuthenticationForm.css";
import { userLogin } from "../../apis/users";
import { useNavigate } from "react-router-dom";

const AuthenticationForm = () => {
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    var body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const result = await userLogin(body);
    localStorage.setItem("access_token", result?.access_token);
    navigate("/users");
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthenticationForm;
