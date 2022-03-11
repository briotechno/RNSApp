import React from 'react';
import {View, Text,StyleSheet} from 'react-native';

const Splash = ({navigation}) => {
  setTimeout(() => {
    const init = () => {
      navigation.replace('Deshboard');
    };
    init();
  }, 3000);

  return (
    <View style={styles.mainView}>
      <Text style={styles.textView}>Welcome To GIF Image</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'gray',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});
export default Splash;