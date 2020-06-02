import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,Alert
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class Kurslar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoadingMore: false,
      _data: null,
      mail: this.props.navigation.getParam("email"),
      sayfa:0,
    };
  }

  fetchData = () => {
    fetch('http://192.168.112.2/wewanted/kurs_listele.php')
      .then(response => response.json())
      .then(rs=>{
        this.setState({
          isLoading: false,
          _data: rs
        })}
      )
      .catch(error => {
        this.setState({sayfa:1})
      });
  };
  kursaGit = id =>()=> {
     this.props.navigation.navigate("KursDetay",{"kursId":id,"btnshow":"goster"});
  }
  componentDidMount() {
    this.fetchData();
  }
  componentWillMount(){
    this.fetchData();
  }
  render() {
    if (this.state.sayfa === 1) {
      return (
        <View style={styles.istekyokCont}>
          <Text style={styles.istekYok}>Kurs Bulunmamaktadır.</Text></View>
      )
    }
     else {
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
                        style={styles.imgContainer}
                      />
                      <View style={styles.box2}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#737372',
                            paddingStart: 10
                          }}
                        >
                          {rowData.adi}
                        </Text>
                        <TouchableHighlight
                          style={styles.btn}
                          onPress={this.kursaGit(rowData.id)}
                        >
                          <Text>Detay</Text>
                        </TouchableHighlight>
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
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'center'
  },
  box: {
    width: 270,
    height: 130,
    borderRadius: 10,
    borderColor: '#C4C0BC',
    borderWidth: 3,
    padding: 10,
    flexDirection: 'row',
    marginTop: 5
  },
  imgContainer: {
    width: 95,
    height: 95,
    borderRadius: 10
  },
  box2: {
    flex: 1,
    flexDirection: 'column'
  },
  btn: {
    width: 80,
    height: 40,
    color: '#f18d03',
    backgroundColor: '#f18d03',
    marginTop: 10,
    marginStart: 58,
    paddingLeft: 19,
    paddingTop: 10,
    borderRadius: 5
  },
  istekYok: {
    fontSize: 22,
    fontWeight: "bold",
    color: '#fff',
  },
  istekyokCont: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  }
});
