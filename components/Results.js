import * as React from "react";
import Constants from "expo-constants";
import { View, Text, Button, StyleSheet } from "react-native";
import AuthContext from "../context/AuthContext";

export default function Results() {
  const { getToken } = React.useContext(AuthContext);

  React.useEffect(() => {
    const result = async () => {
      const res = await getToken();
      console.log(res);
    };

    result()
  }, []);
  return (
    <View style={styles.container}>
      <Text>Results page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
});
