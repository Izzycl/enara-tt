import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { words } from '../../json/dictionary.json';
interface BaseTextProps {
  word: string;
}
const BaseText: FC<BaseTextProps> = ({ word = '' }) => {
  const { width } = useWindowDimensions();
  const [status, setStatus] = useState<'VALID' | 'INVALID' | 'EMPTY'>('EMPTY');
  const styles = StyleSheet.create({
    container: {
      width: width,
    },
    text: {
      fontSize: 23,
      fontWeight: '800',
      color: status === 'VALID' ? 'green' : 'red',
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      borderColor: 'black',
      borderWidth: 2,
      borderStyle: 'solid',
      padding: 20,
    },
  });

  useEffect(() => {
    if (word) {
      if (words.includes(word.toLowerCase())) {
        setStatus('VALID');
      } else {
        setStatus('INVALID');
      }
    } else {
      setStatus('EMPTY');
    }
  }, [word]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>{word}</Text>
        <Text style={styles.text}>{status}</Text>
      </View>
    </View>
  );
};

export default BaseText;
