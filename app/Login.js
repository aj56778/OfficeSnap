import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from './FirebaseSetup';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Login ({navigation}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
console.log('rendered login', email)
  const handleLogin = () => {
    // You can implement your login logic here
    console.log('Email:', email);
    signInWithEmailAndPassword(auth, email,password).
    then((user) => navigation.navigate('Chats'))
    .catch((err) => {
        createUserWithEmailAndPassword(auth, email, password).
        then((user) => navigation.navigate("Chats"))
    })
    console.log('Password:', password)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Your Logo</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
});

