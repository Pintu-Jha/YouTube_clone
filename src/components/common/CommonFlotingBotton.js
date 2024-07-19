import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {spacing} from '../../styles/spacing';
import AddSvg from '../../asset/SVG/AddSvg';

const CommonFlotingBotton = ({
  onPress,
  activeOpacity = 0.8,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      style={styles.bottonContainer}
      activeOpacity={activeOpacity}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <AddSvg />
      )}
    </TouchableOpacity>
  );
};

export default CommonFlotingBotton;

const styles = StyleSheet.create({
  bottonContainer: {
    width: spacing.WIDTH_54,
    height: spacing.HEIGHT_54,
    borderRadius: spacing.HEIGHT_54 / 2,
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: spacing.HEIGHT_30,
    right: spacing.WIDTH_20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
