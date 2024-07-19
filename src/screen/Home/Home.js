import {
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonVideoPlayer from '../../components/common/CommonVideoPlayer';
import {spacing} from '../../styles/spacing';
import {supabase, uploadVideo, url} from '../../supabase';
import {pickDocument} from '../../utills/commonImagePicker';

import CommonFlotingBotton from '../../components/common/CommonFlotingBotton';
import { videoEndpoint } from '../../config/urls';

const Home = () => {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const pickAndUploadVideo = async () => {
    pickDocument(async selectedFile => {
      setLoading(true);
      await uploadVideo(selectedFile);
      await getVideo();
      setLoading(false);
    });
  };
  async function getVideo() {
    const {data, error} = await supabase.storage.from('videos').list('');
    setLoading(true);
    if (data !== null) {
      setVideo(data);
      setLoading(false);
    } else {
      setLoading(false);
      console.error(error);
    }
  }
  useEffect(() => {
    getVideo();
  }, []);
  const onPressPlayVideo = id => {
    setCurrentlyPlayingId(currentlyPlayingId === id ? null : id);
  };
  const onRefresh = () => {
    setRefreshing(true);
    getVideo().finally(() => setRefreshing(false));
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={video}
        renderItem={({item}) => {
          return (
            <View style={{marginVertical: spacing.MARGIN_10}}>
              <CommonVideoPlayer
                key={item.name}
                source={{uri: videoEndpoint + item.name}}
                onPressPlayVideo={() => onPressPlayVideo(item.name)}
                paused={currentlyPlayingId !== item.name}
                repeat={false}
                mainViewStyle={styles.videoPlayerStyle}
              />
            </View>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <CommonFlotingBotton onPress={pickAndUploadVideo} isLoading={loading} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  videoPlayerStyle: {
    marginHorizontal: spacing.MARGIN_4,
    resizeMode: 'cover',
  },
});
