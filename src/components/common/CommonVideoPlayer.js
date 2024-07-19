import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Video from 'react-native-video';
import {spacing} from '../../styles/spacing';
import {textScale, width} from '../../styles/responsiveStyles';

const HEIGHT = spacing.HEIGHT_192;

const CommonVideoPlayer = ({
  paused,
  repeat,
  onPressPlayVideo,
  source,
  mainViewStyle,
}) => {
  const [isBuffering, setIsBuffering] = useState(false);
  function onBuffer() {
    setIsBuffering(!isBuffering);
  }
  function onError() {}
  return (
    <View style={[styles.mainView, mainViewStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1}}
        onPress={() => onPressPlayVideo()}>
        <Video
          source={source}
          onBuffer={onBuffer}
          onError={onError}
          style={styles.videoStyle}
          paused={paused}
          playWhenInactive={false}
          repeat={repeat}
          playInBackground={false}
          audioOutput="speaker"
          posterResizeMode={'contain'}
        />
      </TouchableOpacity>
      {isBuffering ? (
        <View style={styles.bufferStyle}>
          <ActivityIndicator color={'#fff'} size={spacing.WIDTH_68} />
        </View>
      ) : null}
      {paused ? (
        <View style={styles.resumeButtonView}>
          <View style={styles.resumeBackground} />
          <TouchableOpacity
            style={styles.playButtonContainer}
            onPress={() => onPressPlayVideo()}>
            <Image
              source={require('../../asset/image/play.png')}
              style={styles.playIcon}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: HEIGHT,
  },
  videoStyle: {
    height: HEIGHT,
    backgroundColor: '#d4d2d2',
  },
  resumeButtonView: {
    position: 'absolute',
    width: '100%',
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resumeBackground: {
    backgroundColor: 'gray',
    position: 'absolute',
    width: '100%',
    height: HEIGHT,
    opacity: 0.6,
  },
  bufferStyle: {
    position: 'absolute',
    width: '100%',
    height: HEIGHT,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  playButtonContainer: {
    backgroundColor: 'red',
    width: spacing.WIDTH_70,
    height: spacing.WIDTH_70,
    borderRadius: spacing.RADIUS_90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: spacing.WIDTH_50,
    height: spacing.WIDTH_50,
    marginLeft: spacing.MARGIN_8,
    tintColor: '#fff',
  },
  resumeText: {
    color: '#fff',
    marginTop: spacing.MARGIN_6,
    fontSize: textScale(13),
  },
});

export default CommonVideoPlayer;
