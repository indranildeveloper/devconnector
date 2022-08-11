import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ children, auth: { isAuthenticated, loading } }) => {
  // if (loading) return <Spinner />;
  // if (isAuthenticated) return <Component />;
  // return <Navigate to="/login" />;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
