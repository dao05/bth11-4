import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Import all screen components
import Splash from "./screens/Splash";
import Onboarding from "./screens/Onboarding";
import SignIn from "./screens/SignIn";
import Number from "./screens/Number";
import Verification from "./screens/Verification";
import Location from "./screens/Location";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import ProductDetail from "./screens/ProductDetail";
import Explore from "./screens/Explore";
import Beverages from "./screens/Beverages";
import Search from "./screens/Search";
import Filter from "./screens/Filter";
import Cart from "./screens/Cart";
import Favourite from "./screens/Favourite";
import { StoreProvider } from "./context/StoreContext";


const Stack = createStackNavigator();

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Number" component={Number} />
          <Stack.Screen name="Verification" component={Verification} />
          <Stack.Screen name="Location" component={Location} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="Explore" component={Explore} />
          <Stack.Screen name="Beverages" component={Beverages} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Filter" component={Filter} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Favourite" component={Favourite} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
