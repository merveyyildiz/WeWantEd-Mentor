import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList
} from 'react-native';

export default class Gelistiriciler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoadingMore: false,
      id: this.props.navigation.getParam('id'),
      _data: null
    };
  }

  fetchData = () => {
    fetch('http://192.168.112.2/wewanted/junior_listele.php')
      .then(response => response.json())
      .then(rs => {
        this.setState({
          isLoading: false,
          _data: rs
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <ScrollView>
          <FlatList
            data={this.state._data} //Remove this reference to dataSource
            renderItem={({ item: rowData }) => {
              //Replaces renderRow={rowData => {
              return (
                <View style={styles.MainContainer}>
                  <View style={styles.box}>
                    <Image
                      source={{
                        uri:
                          rowData.foto === '' || rowData.foto === null
                            ? 'https://via.placeholder.com/70x70.jpg'
                            : rowData.foto
                      }}
                      style={styles.img}
                    />
                    <View style={styles.textCont}>
                      <Text style={{ fontSize: 16, color: '#fff' }}>
                        {' '}
                        {rowData.ad} {rowData.soyad}
                      </Text>
                      <Text style={{ fontSize: 14, color: '#6b6666' }}>
                        {rowData.email}
                      </Text>
                    </View>
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

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    color: '#fff',
    borderRadius: 10,
    borderColor: '#6b6666',
    borderWidth: 3
  },
  textCont: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 25
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 50
  }
});
