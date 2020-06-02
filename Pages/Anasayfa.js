import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import KurslarScreen from "./Kurslar";
import EtkinliklerScreen from "./Etkinlikler";

const TabScreen = createMaterialTopTabNavigator(
  {
    Kurslar: { screen: KurslarScreen,   },
    Etkinlikler: { screen: EtkinliklerScreen },
  
  },
  {
    initialRouteName: "Kurslar",
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      labelStyle: { fontWeight: "bold" },
      inactiveTintColor: '#fff',
      activeTintColor: '#FF9800',
      style: { backgroundColor: '#000', color:"#020505"}
    }
  }, {
  initialRouteParams: { email:"email" }
}
  
);

//making a StackNavigator to export as default
const App = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      header: null,
      color:"#020505"
    },
  },
});
export default createAppContainer(App);