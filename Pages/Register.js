import React, { Component } from 'react';
import {
  Text,
  Button,
  View,
  Form,
  Input,
  Item,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
export default class Register extends Component {
  static navigationOptions = {
    title: 'Kayıt Ol',
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTintColor: '#fff',
  };

  constructor() {
    super();
    this.state = {
      loading: false,
      disabled: false,
      email: '',
      parola: '',
      tparola: '',
      ad: '',
      soyad: '',
      tanım: '',
      okul_no: '',
      bolum: '',
      foto: '',
      github: '',
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
    if (
      this.state.email == '' ||
      this.state.parola == '' ||
      this.state.tparola == '' ||
      this.state.ad == '' ||
      this.state.soyad == '' ||
      this.state.tanım == '' ||
      this.state.okul_no == '' ||
      this.state.bolum == '' ||
      this.state.foto == '' ||
      this.state.github == ''
    ) {
      Alert.alert('Boş bırakamazsınız');
    } else if (this.state.parola !== this.state.tparola) {
      Aler.alert('Şifreler uyuşmuyor');
    } else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(this.state.email) === false) {
        Alert.alert("Email is Not Correct");
        return false;
      }else{
      this.setState({ loading: true, disabled: true }, () => {
        fetch('http://192.168.112.2/wewanted/create_user.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.email,
            parola: this.state.parola,
            ad: this.state.ad,
            soyad: this.state.soyad,
            tanım: this.state.tanım,
            okul_no: this.state.okul_no,
            bolum: this.state.bolum,
            foto: this.state.foto,
            github: this.state.github,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            alert(responseJson);
            this.setState({ loading: false, disabled: false });
            this.props.navigation.navigate('app', { email: this.state.email });
          })
          .catch((error) => {
            Alert.log('Hata');
            this.setState({ loading: false, disabled: false });
          });
      });
    }}
  };

  render() {
    return (
      <ScrollView style={{ height: '100%' }}>
        <View backgroundColor="#000">
         
          <View style={styles.indexContainer}>
            <Text style={styles.titleText}>
              Bilgilerinizi Giriniz.
                </Text>
            <View>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Mail adresiniz"
                headerTintColor="#fff"
                onChangeText={mail => this.setState({ email: mail })}
              ></TextInput>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Parolanızı yazınız"
                headerTintColor="#fff"
                secureTextEntry={true}
                onChangeText={parola => this.setState({ parola: parola })}
              ></TextInput>

              <TextInput
                style={styles.parola}
                autoCapitalize="none"
                placeholder="Parola tekrarı"
                headerTintColor="#fff"
                secureTextEntry={true}
                onChangeText={parola => this.setState({ tparola: parola })}
              ></TextInput>
            </View>
          </View>

          <View style={styles.indexContainer}>
            <Text style={styles.titleText}>
              Kişisel Bilgilerinizi Giriniz
                </Text>
            <View>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Adınız "
                headerTintColor="#fff"
                onChangeText={ad => this.setState({ ad: ad })}
              ></TextInput>
            </View>
            <View>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Soyadınız "
                headerTintColor="#fff"
                onChangeText={soyad => this.setState({ soyad: soyad })}
              ></TextInput>
            </View>

            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              onChangeText={tanım => this.setState({ tanım: tanım })}
              defaultValue={this.state.text}
              maxLength={120}
              placeholder={'Kendinizi kısaca tanıtınız..'}
              placeholderTextColor={'#fff'}
              underlineColorAndroid={'transparent'}
            />
          </View>

          <View style={styles.indexContainer}>
            <Text style={styles.titleText}>
              Üniversite bilgilerinizi Giriniz
                </Text>

            <View>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Okul numaranız "
                headerTintColor="#fff"
                onChangeText={okulno => this.setState({ okul_no: okulno })}
              ></TextInput>
            </View>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Okul Bölümünüzü Giriniz.. "
              headerTintColor="#fff"
              onChangeText={bolum => this.setState({ bolum: bolum })}
            ></TextInput>

            <Text style={styles.titleText}>
              Profil Fotoğrafınızı Belirleyiniz
                </Text>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={this.onChooseImagePress}
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                  backgroundColor: '#fff',
                  width: 100,
                  height: 40
                }}
              >
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '500',
                    marginLeft: 10,
                    marginTop: 10
                  }}
                >
                  Dosya Seç
                    </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.indexContainer}>
            <Text style={styles.titleText}>
              Sosyal Medya Linklerinizi Giriniz
                </Text>

            <View>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Github Linkiniz"
                headerTintColor="#fff"
                onChangeText={github => this.setState({ github })}
              ></TextInput>
            </View>

            <Button
              title="Gönder"
              style={styles.button}
              full
              rounded
              color="green"
              onPress={this.kaydet}
            >
              <Text style={{ color: '#fff', fontWeight: '500' }}>
                KAYDOL
                  </Text>
            </Button>
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
    backgroundColor: '#000',
  },
  titleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 24,
    marginLeft: 0,
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
  buttoncontainer: {
    height: 50,
    borderRadius: 50,
    backgroundColor: '#1abc9c',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  indexContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    backgroundColor: '#000',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#fff',
    marginTop: 10,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  parola: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: 125,
    fontSize: 15,
    color: '#161F3D',
    marginTop: 10,
    marginLeft: 50,
  },
  button: {
    backgroundColor: '#ff6f00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    height: 40,
  },
  gonder: {
    backgroundColor: '#19bc00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    height: 40,
  },
});
