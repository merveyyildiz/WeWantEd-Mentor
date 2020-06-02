import React, { Component } from 'react';
import {
  TouchableOpacity
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IOSIcon from 'react-native-vector-icons/Ionicons';
import MainScreen from './Pages/MainScreen';
import DetailScreen from './Pages/DetailScreen';

const stackNav = createStackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Main',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
          <IOSIcon name="ios-menu" size={30} />
        </TouchableOpacity>
      ),
      headerStyle: { paddingRight: 10, paddingLeft: 15 }
    })
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Detail'
    })
  },
initialRouteName: 'Main',

});
const stackApp = createAppContainer(stackNav);
export default stackApp;