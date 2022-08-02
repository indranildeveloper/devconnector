import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Passwords do not match!", "danger");
    } else {
      console.log("Success");
    }
  };

  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>

        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label className="from-label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
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
            <small className="form-text">
              * This site uses Gravatar, so if you want a profile image then use
              a Gravatar email.
            </small>
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
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              minLength="6"
              value={confirmPassword}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="my-1">
            Already have an account?{" "}
            <span>
              <Link to="/login">Log In</Link>
            </span>
          </p>
          <button type="submit" className="btn btn-primary btn-lg">
            Sign Up
          </button>
        </form>
      </section>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);
