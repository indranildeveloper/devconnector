import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Landing from "../layout/Landing";
import NotFound from "../layout/NotFound";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";
import AddExperience from "../profile-forms/AddExperience";
import AddEducation from "../profile-forms/AddEducation";
import Posts from "../posts/Posts";
import Post from "../post/Post";

const ComponentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-profile"
        element={
          <PrivateRoute>
            <CreateProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-experience"
        element={
          <PrivateRoute>
            <AddExperience />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-education"
        element={
          <PrivateRoute>
            <AddEducation />
          </PrivateRoute>
        }
      />
      <Route
        path="/posts"
        element={
          <PrivateRoute>
            <Posts />
          </PrivateRoute>
        }
      />
      <Route
        path="/posts/:postId"
        element={
          <PrivateRoute>
            <Post />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default ComponentRoutes;
