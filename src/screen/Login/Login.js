import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from '@rneui/themed';
import {signInUser, signUpUser, supabase} from '../../supabase';
import {navigationString} from '../../navigation/navigationString';
import {textScale} from '../../styles/responsiveStyles';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) Alert.alert(error.message)
      setLoading(false)
    }
  
  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text
          onPress={() => navigation.navigate(navigationString.SIGNUP_SCREEN)}
          style={{fontSize: textScale(16),fontWeight:"bold",color:'#000'}}>
          Sign Up
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
