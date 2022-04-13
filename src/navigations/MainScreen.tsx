import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { BaseButton, BaseText } from '../components/index';
import { board } from '../json/test-board-1.json';
import { ILetter } from '../types/Common';
interface MainScreenProps {}

const MainScreen: FC<MainScreenProps> = (props) => {
  const [letters, setLetters] = useState<ILetter[]>([]);
  const [word, setWord] = useState<string>('');

  const randomOrderLetter = (list: string[]) => {
    let auxList = list.map((e: string) => ({
      letter: e,
      status: false,
    }));
    for (let i: number = auxList.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const temp = auxList[i];
      auxList[i] = auxList[randomIndex];
      auxList[randomIndex] = temp;
    }
    setLetters(auxList);
  };

  const onPressItem = (idx: number) => {
    setLetters(
      letters.map((e: ILetter, id: number) => {
        if (idx === id) {
          return { ...e, status: !e.status };
        }
        return e;
      }),
    );
    setWord((old) => `${old}${letters[idx].letter}`);
  };

  const resetSelected = () => {
    setLetters(letters.map((e) => ({ ...e, status: false })));
    setWord('');
  };

  useEffect(() => {
    randomOrderLetter(board);
  }, []);

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 40,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    content: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 20,
    },
    customBtnBase: {
      width: 40,
      borderRadius: 20,
      height: 40,
      marginVertical: 4,
      paddingVertical: 0,
      paddingHorizontal: 0,
      backgroundColor: word ? 'red' : 'gray',
      borderWidth: 0,
    },
    baseText: {
      fontSize: 0,
    },
    actionButton: {
      padding: 15,
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignItems: 'flex-end',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.actionButton}>
        <BaseButton
          label="X"
          onPress={() => resetSelected()}
          disabled={word ? false : true}
          baseStyle={styles.customBtnBase}
          baseText={styles.baseText}
        />
        <BaseButton
          label="R"
          onPress={() => {
            randomOrderLetter(board);
            setWord('');
          }}
          disabled={false}
          baseStyle={{ ...styles.customBtnBase, ...{ backgroundColor: 'red' } }}
          baseText={styles.baseText}
        />
      </View>

      <View style={styles.content}>
        {letters.map((item: ILetter, idx: number) => (
          <BaseButton
            label={item.letter}
            onPress={() => onPressItem(idx)}
            disabled={item.status}
            key={idx}
          />
        ))}
      </View>
      <BaseText word={word} />
    </View>
  );
};

export default MainScreen;
