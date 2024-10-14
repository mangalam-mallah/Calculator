import { View, Text, Switch, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  // State with types
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');

  // Color definitions
  const colors = {
    dark: '#22252D',
    dark1: '#292B36',
    dark2: '#272B33',
    light: '#F0F0F0',
    light1: 'rgb(220, 220, 220)',
    light2: '#F7F7F7',
  };

  // Calculate function with type for title
  const calculate = (title: string) => {
    if (title === 'C') {
      setResult('');
    } else if (title === 'DL') {
      setResult(result.substring(0, result.length - 1));
    } else if (title === '=') {
      try {
        const ans = Number(eval(result).toFixed(3)).toString();
        setResult(ans);
      } catch (error) {
        setResult('Error');
      }
    } else {
      setResult(result + title);
    }
  };

  // Btn component with props types
  interface BtnProps {
    title: string;
    type: string;
    bgColor?: string; // Add optional bgColor prop
  }

  const Btn: React.FC<BtnProps> = ({ title, type, bgColor }) => (
    <TouchableOpacity
      onPress={() => calculate(title)}
      style={{
        backgroundColor: bgColor ? bgColor : getColor(colors.light, colors.dark2), // Use bgColor if provided
        height: 70,
        width: 70,
        borderRadius: 20,
        margin: 16,
        padding: 10,
        elevation: 4,
      }}
    >
      <Text
        style={{
          fontSize: 37,
          textAlign: 'center',
          textAlignVertical: 'center',
          color: getBtnColor(type),
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  // Function to get button color
  const getBtnColor = (type: string): string => {
    if (type === 'top') {
      return '#fff';
    } else if (type === 'right') {
      return '#fff';
    }
    return getColor(colors.dark, colors.light);
  };

  // Function to get color based on theme
  const getColor = (light: string, dark: string): string => (darkTheme ? dark : light);

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        paddingVertical: 20,
        backgroundColor: getColor(colors.light, colors.dark),
        alignItems: 'center',
      }}
    >
      <Switch
        value={darkTheme}
        onValueChange={() => setDarkTheme(!darkTheme)}
        trackColor={{ true: colors.light2, false: colors.dark2 }}
        thumbColor={getColor(colors.dark, colors.light)}
      />
      <Text
        style={{
          fontSize: 40,
          width: '100%',
          textAlign: 'right',
          paddingRight: 20,
          color: getColor(colors.dark, colors.light),
          marginTop: 160,
          paddingBottom: 20,
        }}
      >
        {result}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          backgroundColor: getColor(colors.light1, colors.dark1),
          elevation: 7,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Btn title="C" type="top" bgColor='#b2bec3'/>
        <Btn title="DL" type="top" bgColor='#b2bec3'/>
        <Btn title="/" type="top" bgColor='#b2bec3'/>
        <Btn title="%" type="top" bgColor="#0984e3" />
        <Btn title="7" type="number" />
        <Btn title="8" type="number" />
        <Btn title="9" type="number" />
        <Btn title="*" type="right" bgColor="#0984e3" />
        <Btn title="4" type="number" />
        <Btn title="5" type="number" />
        <Btn title="6" type="number" />
        <Btn title="+" type="right" bgColor="#0984e3" />
        <Btn title="1" type="number" />
        <Btn title="2" type="number" />
        <Btn title="3" type="number" />
        <Btn title="-" type="right" bgColor="#0984e3" />
        <Btn title="00" type="number" />
        <Btn title="0" type="number" />
        <Btn title="." type="number" />
        <Btn title="=" type="right" bgColor="#0984e3" />
      </View>
    </View>
  );
}
