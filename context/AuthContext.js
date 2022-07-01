import * as React from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const AuthContext = React.createContext();

function AuthContextProvider(props) {
  const reducer = (prevState, action) => {
    switch (action.type) {
      case "RESTORE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };

      case "SIGN_IN":
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
        };

      case "SIGN_OUT":
        return {
          ...prevState,
          isSignout: true,
          userToken: action.token,
        };
    }
  };

  const [state, dispatch] = React.useReducer(
    reducer,
    { isLoading: true, isSignout: true, userToken: null } // initial state
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("user-token");
      } catch (err) {
        console.log(err);
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        const response = await axios.post("http://localhost:5000/users/login", {
          email: data.email,
          password: data.password,
        });
        await SecureStore.setItemAsync("user-token", response.data.token);
        dispatch({ type: "SIGN_IN", token: response.data.token });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      getToken: async() => {
        try {
          return await SecureStore.getItemAsync("user-token")
        } catch (err) {
          console.error(err);
        }
      } ,
    }),
    [state]
  );

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
