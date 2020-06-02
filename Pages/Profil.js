import React, { Component } from 'react';
import {
  Text,
  Button,
  View,
  Image,
  Alert,
  StyleSheet
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { cos } from 'react-native-reanimated';
export default class Profil extends Component {
  static navigationOptions = {

    headerStyle: {
      backgroundColor: '#000'
    },
    headerTintColor: '#fff'
  };

  constructor(props) {
    super(props);
    this.state = {
      mail: this.props.navigation.getParam("email"),
      ad: this.props.navigation.getParam("ad"),
      soyad: this.props.navigation.getParam("soyad"),
      foto: this.props.navigation.getParam("foto"),
      loading: false,
      disabled: false,
      parola: this.props.navigation.getParam("parola"),
      tparola: '',
      tanım: this.props.navigation.getParam("tanım"),
      okul_no: this.props.navigation.getParam("okul_no"),
      bolum: this.props.navigation.getParam("bolum"),
      github: this.props.navigation.getParam("github"),
      id: this.props.navigation.getParam("id")
    };
  }
  onChooseImagePress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
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
    console.log(this.state.mail)
    this.getPermissionAsync();
  }
  update = () => {
   if (this.state.parola !== this.state.tparola) {
      Alert.alert("Şifreler uyuşmuyor");
    }
    else {
      this.setState({ loading: true, disabled: true }, () => {
        fetch('http://192.168.112.2/wewanted/update_profil.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.state.email,
            parola: this.state.parola,
            ad: this.state.ad,
            soyad: this.state.soyad,
            tanim: this.state.tanım,
            okul_no: this.state.okul_no,
            bolum: this.state.bolum,
            foto: this.state.foto,
            github: this.state.github,
            id:this.state.id,
          })
        })
          .then(response => response.json())
          .then(responseJson => {
            alert(responseJson);
            this.setState({ loading: false, disabled: false });
            this.props.navigation.navigate("SideMenu", {
              email: this.state.email,
              parola: this.state.parola,
              ad: this.state.ad,
              soyad: this.state.soyad,
              tanim: this.state.tanım,
              okul_no: this.state.okul_no,
              bolum: this.state.bolum,
              foto: this.state.foto,
              github: this.state.github});
          })
          .catch(error => {
            console.error(error);
            this.setState({ loading: false, disabled: false });
          });
      });
    }
  };

  render() {
    return (
      <ScrollView style={{ height: '100%' }}>
        <View backgroundColor="#000">
          <View style={{ alignItems: "center" }}>
          <Image style={styles.image} source={{
            uri: this.state.foto === '' ||
              this.state.foto === null
              ? 'https://via.placeholder.com/70x70.jpg'
              : this.state.foto
          }} />
          
            <Text style={styles.titleText}>{this.state.ad}{" "}{this.state.soyad}</Text>
            <Text style={{ marginTop: 10,  color:'#fff'}}>{this.state.mail}</Text>
          </View>
          
              <View style={styles.indexContainer}>
                <Text style={styles.titleText}>
                  Bilgilerinizi Güncelleyiniz.
                </Text>
                <Text style={styles.miniText}>Sadece güncellemek istedğiniz yeri doldurabilirsiniz</Text>
                <View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder={this.state.mail}
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
                    placeholder={this.state.ad}
                    headerTintColor="#fff"
                    onChangeText={ad => this.setState({ ad: ad })}
                  ></TextInput>
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder={this.state.soyad}
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
                  placeholder={this.state.tanim}
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
                    placeholder={this.state.okul_no}
                    headerTintColor="#fff"
                    onChangeText={okulno => this.setState({ okul_no: okulno })}
                  ></TextInput>
                </View>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  placeholder={this.state.bolum}
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
                    placeholder={this.state.github}
                    headerTintColor="#fff"
                    onChangeText={github => this.setState({ github })}
                  ></TextInput>
                </View>
           
              
              </View>
              <View style={{display:"flex",alignItems:"center"}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.update}
          >
            <Text style={{ color: '#fff', fontWeight: '500' }}>
              Güncelle
                  </Text>
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
    backgroundColor: "#242424"
  },
  titleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 0
  },
  image: {
    height: 150,
    width: 150,
    marginTop: 30,
 
    borderRadius:50,
  },
  textareaContainer: {
    height: 50,
    padding: 5,
    marginTop: 10
  },
  textarea: {
    textAlignVertical: 'top',
    height: 170,
    fontSize: 14,
    color: '#fff'
  },
  buttoncontainer: {
    height: 50,
    borderRadius: 50,
    backgroundColor: '#1abc9c',
    paddingVertical: 10,
    justifyContent: 'center'
  },
  indexContainer: {
    marginTop:10,
    marginLeft: 30,
    marginRight: 20,
    marginBottom: 30,
    paddingLeft:15,
    paddingRight:15,
    backgroundColor: "#242424"
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#fff',
    marginTop: 10
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase'
  },
  parola: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: 125,
    fontSize: 15,
    color: '#161F3D',
    marginTop: 10,
    marginLeft: 50
  },
  button: {
    backgroundColor: '#ff6f00',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    height: 40,
    width:300,
    borderRadius:20,
  },
  gonder: {
    backgroundColor: '#19bc00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    height: 40
  },
  miniText:{
    fontSize:12,
    color:'#fff',
  }
});
