import { useCallback, useState } from "react";
import { Button, Alert, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoYouTube(props) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  return (
    <View>
      <YoutubePlayer
        height={props.width}
        play={playing}
        videoId={props.lien}
        onChangeState={onStateChange}
      />
    </View>
  );
}
