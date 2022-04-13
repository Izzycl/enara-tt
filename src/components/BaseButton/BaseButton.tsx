import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableHighlight,
  useWindowDimensions,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface BaseButtonProps {
  onPress: () => void;
  label: string;
  baseStyle?: ViewStyle;
  disabled: boolean;
  baseText?: TextStyle;
}

const BaseButton: FC<BaseButtonProps> = ({
  label,
  onPress,
  baseStyle,
  disabled = false,
  baseText,
}) => {
  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    base: {
      width: width / 5,
      marginVertical: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: disabled ? 'green' : 'orange',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'red',
      borderWidth: disabled ? 0 : 2,
    },
    baseText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 50,
    },
  });

  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.base, baseStyle]}
      disabled={disabled}
    >
      <View>
        <Text style={[styles.baseText, baseText]}>{label}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default BaseButton;
