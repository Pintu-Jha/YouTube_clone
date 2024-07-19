import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {spacing} from '../../styles/spacing';
import {textScale} from '../../styles/responsiveStyles';
import BottonComp from '../../components/common/BottonComp';
import {supabase, uploadProfileDetails} from '../../supabase';
import {pickDocument} from '../../utills/commonImagePicker';
import {ProfileImageEndPoint} from '../../config/urls';

const Profile = ({navigation}) => {
  const [DP, setDP] = useState([]);
  const logout = async () => {
    await supabase.auth.signOut();
  };

  const changProfileImage = async () => {
    pickDocument(async selectedFile => {
      await uploadProfileDetails(selectedFile);
      await getprofileDetails();
    });
  };
  async function getprofileDetails() {
    const {data, error} = await supabase.storage.from('profile').list('')
    console.log('dp>>', data);
    if (data !== null) {
      setDP(data);
    } else {
      setLoading(false);
      console.error(error);
    }
  }
  useEffect(() => {
    getprofileDetails();
  }, []);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{paddingVertical: spacing.PADDING_16}}
        onPress={changProfileImage}>
        <Image
          source={{
            uri:
              ProfileImageEndPoint + DP[0]?.name
          }}
          style={styles.imgStyle}
        />
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <Text
            style={{
              fontSize: textScale(20),
              color: '#000',
            }}>
            pintu
          </Text>
        </View>
      </View>
      <BottonComp
        text="Logout"
        style={{
          height: spacing.HEIGHT_40,
          backgroundColor: 'blue',
          margin: spacing.MARGIN_16,
        }}
        textStyle={{color: '#fff', fontSize: textScale(16)}}
        onPress={logout}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  boxView: {
    padding: spacing.PADDING_12,
    borderRadius: spacing.RADIUS_8,
  },
  imgStyle: {
    width: spacing.WIDTH_105,
    height: spacing.HEIGHT_105,
    borderRadius: spacing.HEIGHT_105 / 2,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
});
export default Profile;
