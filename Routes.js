import * as React from "react";
import { Button, View } from "react-native";
import VotingScreen from "./components/voting";
import HomeScreen from "./components/Home";
import LoginScreen from "./components/auth/Login";
import ResultsScreen from "./components/Results";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext, { AuthContextProvider } from "./context/AuthContext";

const Drawer = createDrawerNavigator();

export default function Routes() {
  const { getToken } = React.useContext(AuthContext);
  const state = getToken();

  React.useEffect(() => {
    console.log(state);
  }, []);

  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          {/* {state.userToken != null ? (
            <Drawer.Screen name="voting page" component={VotingScreen} />
          ) : (
            // <Drawer.Screen name="Results" component={ResultsScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
          )} */}
          {/* <Drawer.Screen name="Login" component={LoginScreen} /> */}
          <Drawer.Screen name="Results" component={ResultsScreen} />
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Sign in",
              animationTypeForReplace: state.isSignout ? "pop" : "push",
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}
