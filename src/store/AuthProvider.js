import { useReducer } from "react";
import AuthContext from "./auth-context";

const defaultAuthState = {
  isLoggedIn: false,
  authToken: null,
  email: null,
  name: null,
  id: null,
  isLoading: false,
  error: null, // DEN EIMAI BOOL, EIMAI STRING
};

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
      name: action.item.firstName,
      email: action.item.email,
      id: action.item.id,
      authToken: action.item.token,
      isLoggedIn: true,
    };
  }

  //=======================

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
    return {
      ...state,
      isLoading: false,
      name: action.item.firstName,
      email: action.item.email,
      id: action.item.id,
      authToken: action.item.token,
      isLoggedIn: true,
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

  const checkUserAuthentication = async (email, password) => {
    // Init sign-in
    dispatchAuthAction({ type: "SIGN_IN_INIT" });

    // Init sign-in request
    try {
      // TODO: Send `email` & `password` to API

      // Fake
      const response = {
        id: 1,
        email: "thanasis@petsas.com",
        firstName: "Thanasis",
        lastName: "Peja",
        token: "abc1234",
      };

      dispatchAuthAction({ type: "SIGN_IN_SUCCESS", item: response });
    } catch (error) {
      console.error(error);

      dispatchAuthAction({ type: "SIGN_IN_FAILURE", item: "Sign-in failed!" });
    }
  };

  const registerUser = async (email, password, firstName, lastName) => {
    // Init sign-in
    dispatchAuthAction({ type: "SIGN_UP_INIT" });

    // Init sign-in request
    try {
      // TODO: Send `email` & `password` to API

      // Fake
      const response = {
        id: 1,
        email: "thanasis@petsas.com",
        firstName: firstName,
        lastName: "Peja ",
        token: "abc1234678",
      };

      dispatchAuthAction({ type: "SIGN_UP_SUCCESS", item: response });
    } catch (error) {
      console.error(error);

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
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
