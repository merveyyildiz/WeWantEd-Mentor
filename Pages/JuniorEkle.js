import React, { Component } from 'react';
//import react in our code.
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  SafeAreaView,
  TextInput,
} from 'react-native';
// import all basic components
import { Input, Item, Label, Button } from 'native-base';
export default class Screen2 extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }
  ekle = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === false) {
      Alert.alert("Email is Not Correct");
      return false;
    }else{
    fetch('http://192.168.112.2/wewanted/junior_ekle.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === 'Kayıtlı') {
          Alert.alert('Kullanıcı zaten aktif');
        } else if (responseJson === 'Success') {
          Alert.alert('başarılı');
        } else {
          Alert.alert(responseJson);
        }
      })
      .catch((error) => {
        Alert.alert(
          'Bir hata ile karşılaştık.Doğru email girdiğinizden emin olunuz'
        );
      });}
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <View style={styles.MainContainer}>
          <View style={styles.box}>
            
            <Text style={{ marginTop: 14, color: "#fff"}}>
              Eklemek istediğiniz kişinin email adresini giriniz.
            </Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Email.."
              headerTintColor="#fff"
              onChangeText={(email) => this.setState({ email })}
            ></TextInput>
            <Button style={{ marginTop: 20, borderRadius: 20, backgroundColor: '#ff6f00',}} full  onPress={this.ekle}>
              <Text style={{ color: 'white' }}> Ekle </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginLeft: 50,
    marginTop: 50,
    flexDirection: 'row',
  },
  box: {
    flexDirection: 'column',
    width: 290,
    height: 140,
  },
 
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#fff',
    marginTop: 10,
  },
});
