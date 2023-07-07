import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";
import Spinner from "./Spinner";
import { logout } from "./action";

const store = createStore(rootReducer, composeWithDevTools());

const Root = (props) => {
  const email = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (email?.user.email !== undefined) {
      navigate("/");
    } else {
      dispatch(logout());
      navigate("/login");
    }
  }, []);

  return props.isLoading ? (
    <Spinner />
  ) : (
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>
);

reportWebVitals();
