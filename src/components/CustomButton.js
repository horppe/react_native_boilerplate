import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import TouchableView from './TouchableView';

const CustomButton = ({
  onPress,
  isEnabled,
  isLoading,
  text,
  buttonStyle,
  textStyle,
  colors,
  ...otherProps
}) => {
  const onButtonPress = isEnabled && !isLoading ? onPress : () => null;
  //#5cb85c
  return (
    <View {...otherProps}>
      <TouchableView onPress={onButtonPress}>
        <LinearGradient
          colors={colors ? colors : ['#C7CEF3', '#A5B1ED']}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.1 }}
          style={[
            buttonStyle,
            {
              padding: 15,
              alignItems: 'center',
              borderRadius: 5,
              justifyContent: 'center',
              width: '97%',
              margin: 5,
            },
          ]}>
          {isLoading && (
            <ActivityIndicator style={styles.spinner} color={'white'} />
          )}
          {!isLoading && <Text style={[styles.text, textStyle]}>{text}</Text>}
        </LinearGradient>
      </TouchableView>
    </View>
  );
};

CustomButton.propTypes = {
  onPress: PropTypes.func,
  isEnabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  text: PropTypes.string,
  buttonStyle: PropTypes.any,
  textStyle: PropTypes.any,
};

CustomButton.defaultProps = {
  onPress: () => null,
  isEnabled: true,
  isLoading: false,
};

const styles = StyleSheet.create({
  button: {
    height: 42,
    borderWidth: 1,
    borderRadius: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderColor: '#D7D6E1',
  },
  spinner: {
    height: 26,
  },
  text: {
    textAlign: 'center',
    fontWeight: '400',
    color: 'white',
  },
});

export default CustomButton;
