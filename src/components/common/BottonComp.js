import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {spacing} from '../../styles/spacing';
import {textScale} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';

const BottonComp = ({
  onPress = () => {},
  text = '',
  style = {},
  leftImg = false,
  IconStyle = {},
  source = {},
  rightImg = false,
  textStyle = {},
  isLoading=false
}) => {
  return (
    <TouchableOpacity
      style={{...styles.container, ...style}}
      onPress={onPress}
      activeOpacity={0.8}>
      {!!leftImg ? (
        <Image source={source} style={{...styles.IconStyle, ...IconStyle}} />
      ) : null}
      {isLoading ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Text
          style={{
            ...styles.textStyle,
            ...textStyle,
          }}>
          {text}
        </Text>
      )}
      {!!rightImg ? (
        <Image source={source} style={{...styles.IconStyle, ...IconStyle}} />
      ) : null}
    </TouchableOpacity>
  );
};

export default BottonComp;

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.RADIUS_6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fffefe',
    borderWidth: 1,
    borderColor: '#C8C1DF',
    // width: spacing.WIDTH_124,
    // height: spacing.HEIGHT_40,
    flexDirection: 'row',
  },
  textStyle: {
    color: '#0F0C1A',
    fontSize: textScale(14),
    fontFamily: fontNames.POPPINS_FONT_FAMILY_MEDIUM,
  },
  IconStyle: {
    resizeMode: 'contain',
    width: spacing.WIDTH_18,
    height: spacing.HEIGHT_18,
  },
});
