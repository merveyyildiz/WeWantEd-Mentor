import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView } from 'react-native';
import { Form, Button } from 'native-base';
export default class olustur extends Component {

  constructor(props){
    super(props);
    this.state={
      id:this.props.navigation.getParam("id"),
    }
  }
  navigateToScreen = route => () => {
    console.log(this.state.id)
    this.props.navigation.navigate(route, {
      id: this.state.id
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ height: '100%' }}>

          <Image source={require('../assets/LOGO1.png')} style={styles.image} />

          <View style={styles.view}>
            <Button style={styles.button} full rounded onPress={this.navigateToScreen("KursOlustur")}>
              <Text style={{ color: '#fff' }}>Kurs Oluştur</Text>
            </Button>
            <Button style={styles.button} full rounded onPress={this.navigateToScreen("EtkinlikOlustur")}>
              <Text style={{ color: '#fff' }}>Etkinlik Oluştur</Text>
            </Button>
          </View>

        </ScrollView>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'

  },
  image: {
    width: 300,
    height: 75,
    marginTop: 100,
  },

  view: {
    color: '#fff',
    marginTop: 100,
    fontSize: 30
  },

  button: {
    backgroundColor: '#ff6f00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15

  }

});