import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create Developer Profile/Portfolio, Share Posts and Get help from
            other developers!
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary btn-xl">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-xl">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Landing;
