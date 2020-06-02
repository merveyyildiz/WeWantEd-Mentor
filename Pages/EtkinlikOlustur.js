import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

export default class EtkinlikOlustur extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.navigation.getParam('fixEmail'),

      loading: false,
      disabled: false,
      adi: '',
      bilgi: '',
      tarih: '',
      yer: '',
      kont: '',
      foto: '',
      materyal: '',
    };
  }

  onChooseImagePress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      this.setState({ foto: result.uri });
    }
  };
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  componentDidMount() {
    this.getPermissionAsync();
  }
  kaydet = () => {
    const ad = this.state.adi;
    const bilgi = this.state.bilgi;
    const tarih = this.state.tarih;
    const yer = this.state.yer;
    const foto = this.state.foto;
    const materyal = this.state.materyal;
    if (ad == '' || tarih == '' || yer == '' || foto == '') {
      Alert.alert('Lütfen zorunlu alanları doldurunuz');
    } else {
      fetch('http://192.168.112.2/wewanted/etkinlik_olustur.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          ad: ad,
          foto: foto,
          bilgi: bilgi,
          tarih: tarih,
          yer: yer,
          materyal: materyal,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          alert(responseJson);
          this.setState({ loading: false, disabled: false });
          this.props.navigation.navigate('app');
        })
        .catch((error) => {
          console.error(error);
          this.setState({ loading: false, disabled: false });
        });
    }
  };
  render() {
    return (
      <ScrollView style={{ height: '100%', backgroundColor: '#000' }}>
        <Image style={styles.image} source={require('../assets/LOGO1.png')} />
        <Text style={styles.titleText}>
          Etkinlik Fotoğrafınızı Belirleyiniz
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={this.onChooseImagePress}
            style={{
              marginTop: 10,
              marginLeft: 50,
              backgroundColor: '#fff',
              width: 100,
              height: 40,
            }}
          >
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
                marginLeft: 20,
                marginTop: 10,
              }}
            >
              Dosya Seç
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: 300,
            marginLeft: 30,
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={styles.text}>Etkinlik Adı</Text>
            <Text style={styles.text}>Bilgi</Text>
            <Text style={styles.text}>Yer</Text>
            <Text style={styles.text}>Tarih</Text>
            <Text style={styles.text}>Materyal</Text>
          </View>
          <View style={{ width: 250 }}>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={styles.inputAd}
                autoCapitalize="none"
                headerTintColor="#fff"
                onChangeText={(ad) => this.setState({ adi: ad })}
              ></TextInput>
              <Text style={styles.yildiz}>*</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={styles.inputAd}
                autoCapitalize="none"
                headerTintColor="#fff"
                onChangeText={(bilgi) => this.setState({ bilgi: bilgi })}
              ></TextInput>
              <Text style={styles.yildiz}>*</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                headerTintColor="#fff"
                onChangeText={(yer) => this.setState({ yer: yer })}
              ></TextInput>
              <Text style={styles.yildiz}>*</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder={'2020-01-01 00:00:00'}
                headerTintColor="#fff"
                onChangeText={(tarih) => this.setState({ tarih: tarih })}
              ></TextInput>
              <Text style={styles.yildiz}>*</Text>
            </View>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              headerTintColor="#fff"
              onChangeText={(materyal) => this.setState({ materyal: materyal })}
            ></TextInput>
          </View>
        </View>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={this.kaydet}>
            <Text style={{ color: '#fff', fontWeight: '500' }}>Gönder</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 600,
  },
  titleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 24,
    marginLeft: 30,
  },

  image: {
    height: 75,
    width: 300,
    marginTop: 70,
    marginLeft: 50,
  },
  textareaContainer: {
    height: 50,
    padding: 5,
    marginTop: 10,
  },
  textarea: {
    textAlignVertical: 'top',
    height: 170,
    fontSize: 14,
    color: '#fff',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#fff',
    marginTop: 10,
    width: 140,
    marginLeft: 15,
  },
  inputAd: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: 140,
    marginLeft: 15,
    fontSize: 15,
    color: '#fff',
    marginTop: 10,
  },
  text: {
    color: '#fff',
    marginTop: 30,
  },

  button: {
    backgroundColor: '#ff6f00',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    height: 40,
    borderRadius: 20,
    width: 300,
  },

  yildiz: {
    color: '#d40000',
    fontSize: 10,
    margin: 10,
  },
});
