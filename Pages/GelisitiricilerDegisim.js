import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';

import PropTypes from 'prop-types';

class Selected_Items_Array {
  constructor() {
    selectedItemsArray = [];
  }

  pushItem(option) {
    selectedItemsArray.push(option);
  }

  getArray() {
    return selectedItemsArray;
  }
}

class Checkbox extends Component {
  constructor() {
    super();

    this.state = { checked: null };
  }

  componentWillMount() {
    if (this.props.checked) {
      this.setState({ checked: true }, () => {
        this.props.selectedArrayObject.pushItem({
          key: this.props.keyValue,
          label: this.props.label,
          value: this.props.value,
        });
      });
    } else {
      this.setState({ checked: false });
    }
  }

  toggleState(key, label, value) {
    this.setState({ checked: !this.state.checked }, () => {
      if (this.state.checked) {
        this.props.selectedArrayObject.pushItem({
          key: key,
          label: label,
          value: value,
        });
      } else {
        this.props.selectedArrayObject.getArray().splice(
          this.props.selectedArrayObject
            .getArray()
            .findIndex((x) => x.key == key),
          1
        );
      }
    });
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.toggleState.bind(
          this,
          this.props.keyValue,
          this.props.label,
          this.props.value
        )}
        underlayColor="transparent"
        style={{ marginVertical: 10 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: this.props.size,
              height: this.props.size,
              backgroundColor: this.props.color,
              padding: 3,
            }}
          >
            {this.state.checked ? (
              <View style={styles.checkedView}>
                <Image
                  source={require('../assets/checkbox.png')}
                  style={styles.checkBoxImage}
                />
              </View>
            ) : (
              <View style={styles.uncheckedView} />
            )}
          </View>

          <Text
            style={[styles.checkBoxLabelText, { color: this.props.labelColor }]}
          >
            {this.props.label}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class PRNRadioForm extends Component {
  constructor() {
    super();

    selectedArrayOBJ = new Selected_Items_Array();
    this.state = {
      gelistiriciler: '',
      selectedItems: '',
    };
  }
  getSelectedItems = () => {
    if (selectedArrayOBJ.getArray().length == 0) {
      Alert.alert('No Items Selected!');
    } else {
      // console.log(selectedArrayOBJ.getArray().map(item => item.label).join());

      this.setState({
        selectedItems: selectedArrayOBJ
          .getArray()
          .map((item) => item.value)
          .join(),
      });
      fetch('http://192.168.112.2/wewanted/mentoru_junior_yap.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gelistiriciler: this.state.selectedItems,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson === 'Success') {
            Alert.alert('başarılı');
            window.location.reload(false);
          } else {
            Alert.alert('Bir hata ile karşılaştık.Lütfe tekrar deneyiniz');
            window.location.reload(false);
          }
        })
        .catch((error) => {
          Alert.alert('Hata');
        });
    }
  };
  verigetir() {
    fetch('http://192.168.112.2/wewanted/mentor_listele.php')
      .then((response) => response.json())
      .then((rs) => {
        this.setState({
          gelistiriciler: rs,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.verigetir();
  }

  render() {
    this.verigetir();

    return (
      <ScrollView style={styles.main}>
        <FlatList
          data={this.state.gelistiriciler} //Remove this reference to dataSource
          renderItem={({ item: rowData }) => {
            //Replaces renderRow={rowData => {
            return (
              <Checkbox
                size={30}
                keyValue={1}
                selectedArrayObject={selectedArrayOBJ}
                checked={false}
                color="#f18d03"
                labelColor="#fff"
                label={rowData.email}
                value={rowData.email}
              />
            );
          }}
        />
        <TouchableHighlight
          underlayColor="#DEE7DF"
          style={styles.selectedItemsButton}
          onPress={this.getSelectedItems}
        >
          <Text style={styles.selectedItemsButton_Text}>Junior Yap</Text>
        </TouchableHighlight>

        <Text style={{ fontSize: 20, color: '#000', marginTop: 20 }}>
          {this.state.selectedItems}
        </Text>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: '#000',
    padding: 20,
  },
  item: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  checkBoxTxt: {
    marginLeft: 20,
  },
  MainContainer: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },

  selectedItemsButton: {
    marginTop: 25,
    padding: 8,
    backgroundColor: '#ff6f00',
    alignSelf: 'stretch',
    borderRadius:20,
  },

  selectedItemsButton_Text: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'stretch',
    fontSize: 18,
  },

  checkedView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkBoxImage: {
    height: '80%',
    width: '80%',
    tintColor: 'white',
    resizeMode: 'contain',
  },

  uncheckedView: {
    flex: 1,
    backgroundColor: 'white',
  },

  checkBoxLabelText: {
    fontSize: 16,
    paddingLeft: 10,
  },
});
(Checkbox.propTypes = {
  size: PropTypes.number,
  keyValue: PropTypes.number.isRequired,
  selectedArrayObject: PropTypes.object.isRequired,
  color: PropTypes.string,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
}),
  (Checkbox.defaultProps = {
    size: 30,
    color: '#636c72',
    labelColor: '636c72',
    label: 'Default',
    checked: false,
    value: 'Default',
  });
