import React, { Component } from 'react';
import { Text, Button, View, Image, StyleSheet, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import { ScrollView } from 'react-native-gesture-handler';
import InputScrollView from 'react-native-input-scroll-view';
import * as ImagePicker from 'expo-image-picker';
export default class KursOlustur extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentoremail: this.props.navigation.getParam('email'),
      loading: false,
      disabled: false,
      adi: '',
      foto: '',
      bilgi: '',
      sure: '',
      kont: '',
      yer: '',
      konu: '',
      tarih: '',
      materyal: '',
    };
  }
  componentDidMount() {
    this.getPermissionAsync();
    console.log(this.state.mentoremail);
  }
  save = () => {
    const adi = this.state.adi;
    const email = this.state.mentoremail;
    const foto = this.state.foto;
    const bilgi = this.state.bilgi;
    const sure = this.state.sure;
    const kont = this.state.kont;
    const yer = this.state.yer;
    const konu = this.state.konu;
    const tarih = this.state.tarih;
    const materyal = this.state.materyal;

    if (adi == '') {
      Alert.alert('Lütfen zorunlu alanları doldurunuz.');
    } else {
      fetch('http://192.168.112.2/wewanted/kurs_olustur.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mentoremail: email,
          ad: adi,
          foto: foto,
          bilgi: bilgi,
          sure: sure,
          kont: kont,
          yer: yer,
          konu1: konu,
          tarih1: tarih,
          materyal: materyal,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          alert(responseJson);
          this.setState({ loading: false, disabled: false });
          window.location.reload(false);
        })
        .catch((error) => {
          console.log('Hata');
          this.setState({ loading: false, disabled: false });
        });
    }
  };
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

  render() {
    return (
      <ScrollView style={{ height: '100%', backgroundColor: '#000' }}>
        <View style={{ padding: 10 }}>
          <Image style={styles.image} source={require('../assets/LOGO1.png')} />
          <Text style={styles.titleText}>Kurs Bilgilerini Belirleyiniz</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>Kurs Adı</Text>
            <TextInput
              style={styles.inputAd}
              autoCapitalize={true}
              headerTintColor="#fff"
              onChangeText={(adi) => this.setState({ adi: adi })}
            ></TextInput>
          </View>

          <Text style={styles.titleText}>Kurs Fotoğrafınızı Belirleyiniz</Text>

          <TouchableOpacity
            onPress={this.onChooseImagePress}
            style={{
              marginTop: 10,
              marginLeft: 10,
              backgroundColor: '#fff',
              width: 100,
              height: 40,
            }}
          >
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              Dosya Seç
            </Text>
          </TouchableOpacity>

          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            onChangeText={(bilgi) => this.setState({ bilgi: bilgi })}
            defaultValue={this.state.text}
            maxLength={120}
            placeholder={'Kurs hakkında kısaca bilgi veriniz'}
            placeholderTextColor={'#fff'}
            underlineColorAndroid={'transparent'}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: 300,
            }}
          >
            <View style={{ width: 100 }}>
              <Text style={styles.text}>Sure</Text>
              <Text style={styles.text}>Kontenjan</Text>
              <Text style={styles.text}>Yer</Text>
              <Text style={styles.text}>Tarih</Text>
              <Text style={styles.text}> Materyall</Text>
              <Text style={styles.text}>Konu</Text>
            </View>
            <View style={{ width: 250 }}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder={'saat olarak'}
                headerTintColor="#fff"
                onChangeText={(sure) => this.setState({ sure: sure })}
              ></TextInput>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                headerTintColor="#fff"
                onChangeText={(kon) => this.setState({ kont: kon })}
              ></TextInput>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                headerTintColor="#fff"
                onChangeText={(yer) => this.setState({ yer: yer })}
              ></TextInput>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                headerTintColor="#fff"
                placeholder="2020-01-01 00:00:00"
                onChangeText={(tarih) => this.setState({ tarih: tarih })}
              ></TextInput>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                headerTintColor="#fff"
                placeholder="materyal"
                onChangeText={(materyal) =>
                  this.setState({ materyal: materyal })
                }
              ></TextInput>
              <InputScrollView>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  multiline={true}
                  headerTintColor="#fff"
                  onChangeText={(konu) => this.setState({ konu: konu })}
                  placeholder="Hafta hafta ayırarak yazabilirsiniz"
                ></TextInput>
              </InputScrollView>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <TouchableOpacity style={styles.button} rounded onPress={this.save}>
              <Text style={{ color: '#fff', fontWeight: '500' }}>Gönder</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#171818',
  },
  titleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 24,
    marginLeft: 0,
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

  indexContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    backgroundColor: '#171818',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: 200,
    marginLeft: 15,
    fontSize: 15,
    color: '#fff',
    marginTop: 10,
  },
  inputAd: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: 200,
    marginLeft: 55,
    fontSize: 15,
    color: '#fff',
    marginTop: 10,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: '#ff6f00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    height: 40,
    borderRadius: 20,
    width: 300,
  },

  text: {
    color: '#fff',
    marginTop: 30,
  },
});
