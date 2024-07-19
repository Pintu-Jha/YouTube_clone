import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, Input} from '@rneui/themed';
import {signInUser, signUpUser, supabase} from '../../supabase';
import {navigationString} from '../../navigation/navigationString';
import {Text} from 'react-native';
import {textScale} from '../../styles/responsiveStyles';

export default function SignUp({navigation}) {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    await signUpUser(email, password, userName);

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="User Name"
          onChangeText={text => setUserName(text)}
          value={userName}
          placeholder="username"
          autoCapitalize={'none'}
        />
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
        <Button title="Sign in" disabled={loading} onPress={signUpWithEmail} />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text
          onPress={() => navigation.navigate(navigationString.LOGIN_SCREEN)}
          style={{fontSize: textScale(16), fontWeight: 'bold', color: '#000'}}>
          Sign In
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
