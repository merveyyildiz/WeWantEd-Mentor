import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  CheckBox,
  ImageBackground,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { Form, Button } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Giriş',
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTintColor: '#fff',
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      parola: '',
    };
  }
  UserLoginFunction = () => {
    if (this.state.email == '' || this.state.parola == '') {
      Alert.alert('Boş bırakamazsınız');
    } else {
      fetch('http://192.168.112.2/wewanted/login.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.parola,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // If server response message same as Data Matched
          if (responseJson === 'Data Matched') {
            this.props.navigation.navigate('Bekle', {
              email: this.state.email,
            });
          } else {
            Alert.alert(responseJson);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  render() {
    return (
      <ImageBackground
        source={require('../assets/bg.jpg')}
        style={{ width: '100%', height: '100%' }}
      >
        <ScrollView style={{ height: '100%' }}>
          <View style={styles.container}>
            <Image
              source={require('../assets/LOGO1.png')}
              style={styles.image}
            />

            <Form style={styles.inner}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Mail adresiniz"
                headerTintColor="#fff"
                onChangeText={(mail) => this.setState({ email: mail })}
              ></TextInput>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Parolanızı yazınız"
                headerTintColor="#fff"
                secureTextEntry={true}
                onChangeText={(parola) => this.setState({ parola: parola })}
              ></TextInput>

              <Button
                style={styles.button}
                success
                full
                rounded
                onPress={this.UserLoginFunction}
              >
                <Text>Giriş Yap</Text>
              </Button>
            </Form>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: '80%',
    height: '80%',
    marginTop: 70,
    color: '#fff',
  },
  image: {
    width: 300,
    height: 75,
    marginTop: 100,
  },
  button: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6f00',
  },

  input: {
    color: '#fff',
  },
});
