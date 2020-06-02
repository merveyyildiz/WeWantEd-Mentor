import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
//Import all the screens
import Anasayfa from './Pages/Anasayfa';
import Profil from './Pages/Profil';
import KursGecmisim from './Pages/KursGecmisim';
import Gelistiriciler from './Pages/Gelistiriciler';
import Juniorlar from './Pages/Juniorlar';
import KursiyerIstekleri from './Pages/KursiyerIstekleri';
import JuniorEkle from './Pages/JuniorEkle';
import JuniorDegisim from './Pages/JuniorDegisim';
import SideMenu from './SideMenu';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Begin from './Pages/Begin';
import EtkinlikOlustur from './Pages/EtkinlikOlustur';
import KursOlustur from './Pages/KursOlustur';
import KursDetay from './Pages/KursDetay';
import KursAcmaIstegiDetay from './Pages/KursAcmaIstegiDetay';
import GelistiricilerDegisim from './Pages/GelisitiricilerDegisim';
import KursAcmaIstegi from './Pages/KursAcmaIstegi';
import Bekle from './Pages/Bekle';
//Navigation Drawer Structure for all screen
class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer(); //drawer açıksa kapatır kapalıysa açar
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('./assets/menu.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
//Stack Navigator for the First Option of Navigation Drawer
const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the First Option will be indexed here
  Anasayfa: {
    screen: Anasayfa,
    navigationOptions: ({ navigation }) => ({
      title: 'Anasayfa',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />, // icon nerede olacağını belirliyor
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
        flexGrow: 1,
        alignSelf: 'center',
      },
    }),
  },
});
//Stack Navigator for the Second Option of Navigation Drawer
const Profil_StackNavigator = createStackNavigator({
  //All the screen from the Second Option will be indexed here
  Profil: {
    screen: Profil,
    navigationOptions: ({ navigation }) => ({
      title: 'Profil',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
    }),
  },
});

//Stack Navigator for the Third Option of Navigation Drawer
const KursGecmisim_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  KursGecmisim: {
    screen: KursGecmisim,
    navigationOptions: ({ navigation }) => ({
      title: 'Kurs Geçmişim',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
    }),
  },
});
const Gelistiriciler_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Gelistiriciler: {
    screen: Gelistiriciler,
    navigationOptions: ({ navigation }) => ({
      title: 'Gelistiriciler',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
    }),
  },
});
const Juniorlar_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Juniorlar: {
    screen: Juniorlar,
    navigationOptions: ({ navigation }) => ({
      title: 'Juniorlar',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
    }),
  },
});
const JuniorEkle_StackNavigator = createStackNavigator({
  JuniorEkle: {
    screen: JuniorEkle,
    navigationOptions: ({ navigation }) => ({
      title: 'Junior Ekle',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
    }),
  },
});
const KursiyerIstekleri_StackNavigator = createStackNavigator({
  KursiyerIstekleri: {
    screen: KursiyerIstekleri, //import edilen sayfa
    navigationOptions: ({ navigation }) => ({
      title: 'Kursiyer Istekleri',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
    }),
  },
});
const JuniorDegisim_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  JuniorDegisim: {
    screen: JuniorDegisim,
    navigationOptions: ({ navigation }) => ({
      title: 'Junior Degisim',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
    }),
  },
});

const KursOlustur_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  KursOlustur: {
    screen: KursOlustur,
    navigationOptions: ({ navigation }) => ({
      title: 'Kurs Oluştur',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
    }),
  },
});
const EtkinlikOlustur_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  EtkinlikOlustur: {
    screen: EtkinlikOlustur,
    navigationOptions: ({ navigation }) => ({
      title: 'Etkinlik Oluştur',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
    }),
  },
});
const KursDetay_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  KursDetay: {
    screen: KursDetay,
    navigationOptions: ({ navigation }) => ({
      title: 'KursDetay',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
    }),
  },
});
const GelistiricilerDegisim_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  GelistiricilerDegisim: {
    screen: GelistiricilerDegisim,
    navigationOptions: ({ navigation }) => ({
      title: 'Gelistiriciler Degisim',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#ff6f00',
      },
      headerTintColor: 'black',
    }),
  },
});
const KursAcmaIstegi_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  KursAcmaIstegi: {
    screen: KursAcmaIstegi,
    navigationOptions: ({ navigation }) => ({
      title: 'Kurs Acma Istegi',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
    }),
  },
});
const KursAcmaIstegiDetay_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  KursAcmaIstegiDetay: {
    screen: KursAcmaIstegiDetay,
    navigationOptions: ({ navigation }) => ({
      title: 'Kurs Açma İsteği Detay',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f18d03',
      },
      headerTintColor: 'black',
    }),
  },
});

//Drawer Navigator for the Navigation Drawer / Sidebar
const Drawer = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    NavAnasayfa: { screen: FirstActivity_StackNavigator },
    ProfilScreen: { screen: Profil_StackNavigator },
    KursGecmisimScreen: { screen: KursGecmisim_StackNavigator },
    GelistiricilerScreen: { screen: Gelistiriciler_StackNavigator },
    JuniorlarScreen: { screen: Juniorlar_StackNavigator },
    KursiyerIstekleriScreen: { screen: KursiyerIstekleri_StackNavigator },
    JuniorEkleScreen: { screen: JuniorEkle_StackNavigator },
    JuniorDegisimScreen: { screen: JuniorDegisim_StackNavigator },
    KursOlusturScreen: { screen: KursOlustur_StackNavigator },
    EtkinlikOlusturScreen: { screen: EtkinlikOlustur_StackNavigator },
    KursDetayScreen: { screen: KursDetay_StackNavigator },
    GelistiricilerDegisimScreen: {
      screen: GelistiricilerDegisim_StackNavigator,
    },
    KursAcmaIstegiScreen: {
      screen: KursAcmaIstegi_StackNavigator,
    },
    KursAcmaIstegiDetayScreen: {
      screen: KursAcmaIstegiDetay_StackNavigator,
    },
  },
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 80,
  }
);

const screens = createStackNavigator({
  Begin: { screen: Begin },
  Login: { screen: Login },
  Register: { screen: Register },
  Bekle: { screen: Bekle },
  initialRouteName: 'Begin',
});

const MainApp = createSwitchNavigator(
  // geri işlevsellik yok rotayı sıfırlar
  {
    app: Drawer,
    auth: screens,
  },
  {
    initialRouteName: 'auth',
  }
);

const AppContainer = createAppContainer(MainApp);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
