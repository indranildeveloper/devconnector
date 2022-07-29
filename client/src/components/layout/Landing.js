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
            <a href="register.html" className="btn btn-primary btn-xl">
              Sign Up
            </a>
            <a href="login.html" className="btn btn-xl">
              Log In
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Landing;
