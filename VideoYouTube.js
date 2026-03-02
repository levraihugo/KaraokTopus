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
  const playerRef = useRef();
  const [tempsEcoule, setTempsEcoule] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const sec_ecoule = await playerRef.current.getCurrentTime();

      const msec_ecoule = Math.floor(sec_ecoule * 1000);
      const msec = msec_ecoule % 1000;
      const min = Math.floor(msec_ecoule / 60000);
      const sec = Math.floor((msec_ecoule - min * 60000) / 1000);

      setTempsEcoule(
        min.toString().padStart(2, "0") +
          ":" +
          sec.toString().padStart(2, "0") +
          ":" +
          msec.toString().padStart(3, "0"),
      );
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [playing, setPlaying] = useState(false);
  const [total, setTotal] = useState(0);
  const [getDuree, setTestDuree] = useState(false);
  const onStateChange = useCallback((state) => {
    if (state === "playing" && !getDuree) {
      setTotal(GetTime(playerRef));
      setTestDuree(true);
    }
  }, []);

  return (
    <>
      <YoutubePlayer
        ref={playerRef}
        width={props.width}
        height={props.height}
        play={playing}
        videoId={props.lien}
        onChangeState={onStateChange}
      />
      <View>
        <Text>
          {tempsEcoule}/{total}
        </Text>
      </View>
    </>
  );
}
