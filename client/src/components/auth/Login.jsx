import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Success");
  };

  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Log In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Log In to Account
        </p>

        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              minLength="6"
              value={password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="my-1">
            Do not an account?{" "}
            <span>
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
          <button type="submit" className="btn btn-primary btn-lg">
            Log In
          </button>
        </form>
      </section>
    </>
  );
};
export default Login;
