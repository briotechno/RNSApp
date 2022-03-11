import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput
} from 'react-native';

import axios from 'react-native-axios';

class Deshboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      limit: 10,
      data: [],
      searchInput: '',
      api_key: 'fs4ZAWnOaZIWL5u2Zwx4ek1Pp4IbaGaP',
    };
  }

  componentDidMount() {
    this.getData(10);
  }

  getData = async length => {
    axios
      .get(`http://api.giphy.com/v1/gifs/trending`, {
        params: {
          offset: 0,
          limit: length,
          api_key: this.state.api_key,
        },
      })
      .then(res => {
        this.setState({
          data: res.data.data,
        });
        console.log('checking', res.data.data.length);
      })
      .catch(err => {
        console.log(err);
        alert('Please check your internet connection!');
      });
  };

  Viewend = item => {
    return (
      <View style={{height: '45%', width: '45%', margin: 10}}>
        <Image
          source={{uri: item.images.original.url}}
          style={{height: 200, width: '100%', borderRadius: 5}}
        />
      </View>
    );
  };

  onSearch = async () => {
    this.setState({
      limit: 10,
    });
    axios
      .get(`http://api.giphy.com/v1/gifs/search`, {
        params: {
          offset: 0,
          limit: this.state.limit,
          api_key: this.state.api_key,
          q: this.state.searchInput,
        },
      })
      .then(res => {
        this.setState({
          data: res.data.data,
        });
      })
      .catch(err => {
        console.log(err);
        alert('Please check your internet connection!');
      });
  };

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.searchView}>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              borderRadius: 30,
              borderBottomStartRadius: 30,
            }}>
            <TextInput
              placeholder="Search Image"
              onChangeText={value => {
                console.log(value,"test check")
                this.setState({
                  searchInput: value,
                });
              }}
              style={styles.searchBarView}
            />
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                backgroundColor: '#f5f5f5',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopEndRadius: 30,
                borderBottomEndRadius: 30,
                shadowColor: 'red',
                shadowOpacity: 2,
                elevation: 5,
              }}>
             <TouchableOpacity onPress={() => {
                this.onSearch()
              }}>
                <Image
                  style={{height: 40, width: 40}}
                  source={require('../assets/image/S.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.imageView}>
          <FlatList
            onEndReachedThreshold={0.01}
            data={this.state.data}
            numColumns={2}
            initialNumToRender={6}
            renderItem={({item}) => this.Viewend(item)}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => {
              if(this.state.searchInput){
                this.onSearch(this.state.limit + 10);
              }else{
                this.getData(this.state.limit + 10);
              }
              
              this.setState({
                limit: this.state.limit + 10,
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },
  imageView: {
    flex: 7,
    height: 200,
    width: '100%',
  },
  searchBarView: {
    backgroundColor: '#f5f5f5',
    width: '80%',
    padding: 10,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    fontSize: 17,
    shadowColor: 'red',
    shadowOpacity: 2,
    elevation: 5,
  },
  item: {},
});

export default Deshboard;