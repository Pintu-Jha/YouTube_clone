import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import {AppState, Linking} from 'react-native';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const signUpUser = async (email, password, userName) => {
  try {
    const {user, session, error} = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Error signing up user:', error.message);
      return {error};
    }

    const {error: insertError} = await supabase.from('auth').insert([
      {
        userName,
        email: user.email,
      },
    ]);

    if (insertError) {
      console.error('Error inserting user profile:', insertError.message);
      return {error: insertError};
    }

    return {user, session};
  } catch (error) {
    console.error('Error in signUpUser:', error.message);
    return {error};
  }
};

export const signInUser = async (email, password) => {
  const {user, session, error} = await supabase.auth.signIn({email, password});

  if (error) {
    console.error('Error signing in user:', error.message);
    return {error};
  }

  return {user, session};
};

export const handleRedirect = async () => {
  const url = await Linking.getInitialURL();
  if (url) {
    const {error} = await supabase.auth.getSessionFromUrl({
      storeSession: true,
      url,
    });
    if (error) {
      console.error('Error handling redirect:', error);
    } else {
      console.log('User authenticated via magic link');
    }
  }
};

export const uploadVideo = async file => {
  console.log(file);
  try {
    const {data, error} = await supabase.storage
      .from('videos')
      .upload(file.name, file, {
        cacheControl: '3600',
        upsert: false,
      });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error uploading file:', error.message);
  }
};
export const uploadProfileDetails = async file => {
  try {
    const {data, error} = await supabase.storage
      .from('profile')
      .upload(file.name);
    console.log(data);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error uploading file:', error.message);
  }
};

AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
