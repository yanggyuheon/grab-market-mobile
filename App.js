// import "react-native-gesture-handler";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/main";
import ProductScreen from "./screens/Product";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ title: "홈 화면" }}
          />
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{ title: "상품 화면" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
