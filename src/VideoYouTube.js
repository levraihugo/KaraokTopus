import { useRef, useState, useEffect, useCallback } from "react";
import { Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

async function GetTime(playerRef) {
  const tot = await playerRef.current.getDuration();
  const min = Math.floor(tot / 60);
  const sec = Math.floor(tot - min * 60);
  return (
    min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0")
  );
}

export default function VideoYouTube(props) {
  const [total, setTotal] = useState(0);
  const [getDuree, setTestDuree] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "playing" && !getDuree) {
      setTotal(GetTime(props.playerRef));
      setTestDuree(true);
      props.onReady();
    }
  }, []);

  const onReady = useCallback(() => {
    props.onReady();
  }, []);

  return (
    <>
      <YoutubePlayer
        ref={props.playerRef}
        width={props.width}
        height={props.height}
        play={props.playing}
        videoId={props.lien}
        onChangeState={onStateChange}
        // onReady={onReady}
      />
      <View>
        <Text>
          {props.tempsEcoule} / {total}
        </Text>
      </View>
    </>
  );
}
