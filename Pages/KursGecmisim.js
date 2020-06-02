import React, { Component } from 'react';
//import react in our code.
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
} from 'react-native';
// import all basic components

export default class Screen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoadingMore: false,
      data: null,
      mail: this.props.navigation.getParam('email'),
      sayfa: 0,
    };
  }
  fetchData = () => {
    fetch('http://192.168.112.2/wewanted/kurs_gecmisi.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.mail,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          disabled: false,
          data: responseJson,
        });
      })
      .catch((error) => {
        this.setState({ sayfa: 1 });
      });
  };

  componentDidMount() {
    this.fetchData();
  }
  kursaGit = (id) => () => {
    this.props.navigation.navigate("KursDetay", { "kursId": id,"btnshow":"gosterme"});
  };
  render() {
    if (this.state.sayfa === 1) {
      return (
        <View style={styles.istekyokCont}>
          <Text style={styles.istekYok}>Kurs Geçmişiniz Bulunmamaktadır.</Text>
        </View>
      );
    } else {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
          <ScrollView>
            <FlatList
              data={this.state.data} //Remove this reference to dataSource
              renderItem={({ item: rowData }) => {
                //Replaces renderRow={rowData => {
                return (
                  <View style={styles.MainContainer}>
                    <View style={styles.box}>
                      <View style={styles.box2}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#737372',
                            paddingStart: 20,
                          }}
                        >
                          {rowData.ders_adi}
                        </Text>
                      </View>
                      <TouchableHighlight
                        style={styles.btn}
                        onPress={this.kursaGit(rowData.ders_id)}
                      >
                        <Text>Detay Git</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                );
              }}
            />
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  box: {
    width: 270,
    height: 100,
    borderRadius: 10,
    borderColor: '#C4C0BC',
    borderWidth: 3,
    padding: 10,
    flexDirection: 'column',
    marginTop: 5,
  },
  imgContainer: {
    width: 95,
    height: 95,
    borderRadius: 10,
  },
  box2: {
    flex: 1,
    flexDirection: 'column',
  },

  istekYok: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  istekyokCont: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  btn: {
    width: 220,
    height: 35,
    color: '#f18d03',
    backgroundColor: '#f18d03',
    marginTop: 10,
    marginStart: 11,
    paddingLeft: 75,
    paddingTop: 7,
    borderRadius: 5,
  },
});
