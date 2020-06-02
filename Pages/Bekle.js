import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, SafeAreaView, Alert } from 'react-native';

export default class Screen2 extends Component {
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: '#000',
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
      mail: this.props.navigation.getParam('fixEmail'),
    };
  }
  fetchData() {
    fetch('http://192.168.112.2/wewanted/kontrol.php', {
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
        if (responseJson[0].no === '0') {
          this.setState({
            isLoading: false,
            disabled: false,
            data: responseJson[0],
          });
        } else {
          this.props.navigation.navigate('app', { "email": this.state.mail });
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false, disabled: false });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <SafeAreaView
          style={{ flex: 1, backgroundColor: '#000' }}
        ></SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
          <View style={styles.cont}>
            <Text style={styles.styleText}>
              LÜTFEN SİZE ATANAN MENTOR İLE İLETİŞİME GEÇİNİZ
            </Text>

            <Text style={styles.styleText}>{this.state.data.mentoru} </Text>
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  cont: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  styleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
});
