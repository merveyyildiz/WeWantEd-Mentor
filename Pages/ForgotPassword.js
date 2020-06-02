import React, { Component } from 'react';
import {StyleSheet, Text, View,  ImageBackground, Image } from 'react-native';
import {Form, Item, Label, Input, Button} from 'native-base';

export default class ForgotPassword extends Component{
   
    static navigationOptions ={
        title:'Şifremi Unuttum',
        headerStyle:{
            backgroundColor:'#000',
        },
        headerTintColor:'#fff'
    }
    
    render(){
        return (
          <ImageBackground
            source={require('../assets/bg.jpg')}
            style={{ width: '100%', height: '100%' }}
          >
            <View style={styles.container}>
              <Image
                source={require('../assets/LOGO1.png')}
                style={styles.image}
              />

              <Form style={styles.inner}>
                <Text style={styles.label}>
                  Üyeliğinize ait E-posta adresinizi giriniz
                </Text>
                <Item floatingLabel>
                  <Label style={styles.label}>E-Mail adresiniz</Label>
                  <Input style={styles.label} />
                </Item>

                <Button
                  style={{ marginTop: 30 }}
                  success
                  full
                  onPress={() => this.props.navigation.navigate('')}
                >
                  <Text style={styles.label}>Parolayı Sıfırla</Text>
                </Button>
              </Form>
            </View>
          </ImageBackground>
        );
    }

}


const styles = StyleSheet.create({
    container: {
      margin:24,
      justifyContent: 'center',
      alignItems: 'center'
      
    },
    inner: {
      width: '80%',
      height:'80%',
      marginTop:70,
      color:'#fff',
    },
    image:{
        width:300,
        height:75,
        marginTop:100,
    },
    label:{
        color:'#fff',
        fontSize:15
    },

    button:{
        backgroundColor: '#19bc00', 
        width: 100,
        marginLeft:60,
        justifyContent: 'center',
        alignItems: 'center'

    },
    

  });