import { StatusBar } from 'expo-status-bar';
import { Button, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Styles from './Styles';
import { useState, useRef, useEffect} from 'react';
import { Dimensions, Animated } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { auth } from './FirebaseSetup';
// import Voice from '@react-native-voice/voice';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function MainPage({navigation}) {
  const nav = useNavigation();
  const [posy, setPosy] = useState();
  const [dark, setDark] = useState();
  const resetRef = useRef(null);
  const dragRef = useRef(null);
  const [r, setr] = useState(0);
  const [d, setd] = useState(0);
  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
      Animated.timing(animation, {
        toValue:1,
        duration:1000,
        useNativeDriver:true,
      }),
      Animated.timing(animation, {
        toValue:0.7,
        duration:1000,
        useNativeDriver:true,
      }),
      Animated.timing(animation, {
        toValue:1,
        duration:1000,
        useNativeDriver:true,
      }),
    ])).start();
  },[animation]);
  const move = (e) => {
    setPosy(e.nativeEvent.translationY);
    setDark(255-(posy));
    if (resetRef.current) {
      let resetLoc = resetRef.current.measure((x,y) => y);
      dragRef.current.measure((x,y) => setd(y));
      resetRef.current.measure((x,y) => setr(y));
      frames = (d-5);
      // console.log(frames);
      if (r>=150 && (r-150)<=d) {
        setVisible(false);
      }
  }
  }
  const reset = () => {
    setPosy(0); setDark(255); setVisible(true);
    if (resetRef.current && dragRef.current){
        dragRef.current.measure((x,y) => setd(y));
        resetRef.current.measure((x,y) => setr(y));
    }
   }
   const goToChat = () => {
    nav.navigate('Chat');
   }
  const styles = Styles;
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerFont}>OfficeSnap</Text>
      </View>
      <Animated.View style={[styles.footerContainer1, {transform:[{scale:animation}]}]}>
        <Text style={styles.footerFont} onPress={() => navigation.navigate('Login')}>Login/Sign-Up</Text>
      </Animated.View>
      {/* <Animated.View style={[styles.footerContainer, {transform:[{scale:animation}]}]}>
        <Text style={styles.footerFont} onPress={() => navigation.navigate('Chats')}>Open My Office</Text>
      </Animated.View> */}
      <StatusBar style="auto" />

    </ScrollView>
  );
}