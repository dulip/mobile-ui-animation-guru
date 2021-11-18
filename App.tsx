/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {FC} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';

import PanGesture from './src/Gesture/Gesture';

const {width, height} = Dimensions.get('window');
const containerWidth = width;
const containerHeight = height;

const App: FC<JSX.Element> = () => {
  return (
    <View style={styles.container}>
      <PanGesture width={containerWidth} height={containerHeight} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default App;
