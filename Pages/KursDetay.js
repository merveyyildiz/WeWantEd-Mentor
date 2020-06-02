import React, { Component } from 'react';
import { Text, Button, View, Image, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
export default class KursOlustur extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      disabled: false,
      id: this.props.navigation.getParam('kursId'),
      data: [],
      kurs_sahibi: '',
      ders_adi: '',
      btnshow:this.props.navigation.getParam('btnshow')
    };
  }
  kursGetir() {
    fetch('http://192.168.112.2/wewanted/kurs_detay.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          disabled: false,
          data: responseJson[0],
          kurs_sahibi: responseJson[0].mentoremail,
          ders_adi: responseJson[0].adi
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ loading: false, disabled: false });
      });
  }
  save = () => {
    fetch('http://192.168.112.2/wewanted/kurs_basvurusu.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        kurs_adi: this.state.ders_adi,
        kurs_sahibi: this.state.kurs_sahibi,
        ders_id: this.state.id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson === 'Basvurusu Var') {
          Alert.alert('Başvurunuz zaten yapılmış.');
        } else if (responseJson === 'Success!') {
          Alert.alert('Başvurunuz alındı');
        } else {
          Alert.alert('hata');
        }
      })
      .catch(error => {
        Alert.alert('Error');
        this.setState({ loading: false, disabled: false });
      });
  };
  componentDidMount() {
    this.kursGetir();
  }
  static getDerivedStateFromProps(props, state) {
    const id = props.navigation.getParam('kursId');
    const btnshow = props.navigation.getParam('btnshow');
    if (state.id !== id || state.btnshow !== btnshow) {
      return {
        id: id,
        btnshow:btnshow
      };
    }
    return null;
  }
  render() {
    {
      this.kursGetir();
    }
    return (
      <ScrollView style={{ height: '100%', backgroundColor: '#000' }}>
        <View style={{ padding: 10 }}>
          <Image style={styles.image} source={{ uri: this.state.data.foto }} />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignSelf: 'center'
            }}
          >
            <View style={{ width: 100 }}>
              <Text style={styles.text}>Kurs Adı</Text>
              <Text style={styles.text}>Sure</Text>
              <Text style={styles.text}>Kontenjan</Text>
              <Text style={styles.text}>Yer</Text>
              <Text style={styles.text}>Materyal</Text>
              <Text style={styles.text}>Tarih</Text>
              <Text style={styles.text}>Konu</Text>
              <Text style={styles.text}>Kurs Açan</Text>
            </View>
            <View
              style={{ width: 150, backgroundColor: '555', marginBottom: 10 }}
            >
              <Text style={styles.text}>{this.state.data.adi}</Text>
              <Text style={styles.text}>{this.state.data.sure}</Text>
              <Text style={styles.text}>{this.state.data.kontenjan}</Text>
              <Text style={styles.text}>{this.state.data.yer}</Text>
              <Text style={styles.text}>{this.state.data.materyal}</Text>
              <Text style={styles.text}>{this.state.data.tarih1}</Text>
              <ScrollView>
                <Text style={styles.text}>{this.state.data.konu1}</Text>
              </ScrollView>
              <Text style={styles.text}>{this.state.data.mentoremail}</Text>
            </View>
          </View>
            {this.state.btnshow === "gosterme" ? null:
          <Button
            title="Kaydol"
            style={styles.button}
            rounded
            onPress={this.save}
          >
            <Text style={{ color: '#fff', fontWeight: '500' }}>Kaydol</Text>
          </Button>}
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
    backgroundColor: '#171818'
  },
  image: {
    height: 150,
    width: 150,
    marginTop: 20,
    flex: 1,
    alignSelf: 'center'
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: 200,
    marginLeft: 15,
    fontSize: 15,
    color: '#fff',
    marginTop: 10
  },
  inputAd: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: 200,
    marginLeft: 55,
    fontSize: 15,
    color: '#fff',
    marginTop: 10
  },
  button: {
    backgroundColor: '#ff6f00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    height: 40
  },
  gonder: {
    backgroundColor: '#19bc00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    height: 40
  },
  text: {
    color: '#fff',
    marginTop: 30
  }
});
