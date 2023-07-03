import { useState, useReducer } from "react";
import AuthContext from "./auth-context";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const defaultAuthState = {
  isLoggedIn: false,
  authToken: null,
  email: null,
  firstName: null,
  lastName: null,
  phone: null,
  id: null,
  isLoading: false,
  error: null,
  registerSuccess: false,
  loginSuccess: false,
};

const defaultModalState = {
  showModal: false,
  showSignIn: true,
  rememberMe: false,
};

const link = "http://localhost:7160/";

const authReducer = (state, action) => {
  if (action.type === "SIGN_IN_INIT") {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }

  if (action.type === "SIGN_IN_FAILURE") {
    return {
      ...state,
      isLoading: false,
      error: action.item,
    };
  }

  if (action.type === "SIGN_IN_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      loginSuccess: true,
      firstName: action.item.userFirstName,
      lastName: action.item.userLastName,
      email: action.item.email,
      phone: action.item.phone,
      id: action.item.userId,
      authToken: action.item.token,
      isLoggedIn: true,
      registerSuccess: false,
      rememberMe: action.item.rememberMe,
    };
  }

  if (action.type === "SIGN_UP_INIT") {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }

  if (action.type === "SIGN_UP_FAILURE") {
    return {
      ...state,
      isLoading: false,
      error: action.item,
    };
  }

  if (action.type === "SIGN_UP_SUCCESS") {
    console.log("action.item", action.item);
    return {
      ...state,
      isLoading: false,
      registerSuccess: action.item,
    };
  }

  if (action.type === "USER_LOGOUT") {
    return (state = defaultAuthState);
  }

  return defaultAuthState;
};

const AuthProvider = (props) => {
  const [authState, dispatchAuthAction] = useReducer(
    authReducer,
    defaultAuthState
  );

  const [modalState, setModalState] = useState(defaultModalState);

  const toggleSignIn = () =>
    setModalState((prev) => ({
      ...prev,
      showSignIn: !prev.showSignIn,
    }));

  const toggleShowModal = () =>
    setModalState((prev) => ({
      ...prev,
      showModal: !prev.showModal,
    }));

  const resetShowSignIn = () =>
    setModalState((prev) => ({
      ...prev,
      showSignIn: true,
    }));

  const checkUserAuthentication = async (email, password, rememberMe) => {
    // Init sign-in
    dispatchAuthAction({ type: "SIGN_IN_INIT" });

    // Init sign-in request
    try {
      // TODO: Send `email` & `password` to API
      const payload = {
        email: email,
        password: password,
        rememberMe: rememberMe,
      };

      const res = await axios.post(
        "http://localhost:7160/api/auth/register/login",
        payload
      );
      console.log("LOGIN RESPONSE", res.data.item);
      dispatchAuthAction({ type: "SIGN_IN_SUCCESS", item: res.data.item });
    } catch (error) {
      console.error(error);
      toast("Failed to login", {
        duration: 2000,
        type: "error",
      });

      dispatchAuthAction({ type: "SIGN_IN_FAILURE", item: "Sign-in failed!" });
    }
  };

  const registerUser = async (email, password, firstName, lastName) => {
    // Init sign-in
    dispatchAuthAction({ type: "SIGN_UP_INIT" });

    // Init sign-in request
    try {
      // TODO: Send `email` & `password` to API

      const payload = {
        email: email,
        fName: firstName,
        lName: lastName,
        phone: "1234567890",
        password: password,
      };

      const res = await axios.post(
        "http://localhost:7160/api/auth/register/registration",
        payload
      );
      dispatchAuthAction({ type: "SIGN_UP_SUCCESS", item: res.data.value });
    } catch (error) {
      console.error(error);
      toast("Failed to register", {
        duration: 2000,
        type: "error",
      });

      dispatchAuthAction({ type: "SIGN_UP_FAILURE", item: "Sign-Up failed!" });
    }
  };

  const userLogout = () => {
    console.log("USER_LOGOUT");
    dispatchAuthAction({ type: "USER_LOGOUT" });
  };

  const authContext = {
    ...authState,
    checkAuthentication: checkUserAuthentication,
    registerUser: registerUser,
    onLogout: userLogout,
    modalState,
    toggleSignIn,
    toggleShowModal,
    resetShowSignIn,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
