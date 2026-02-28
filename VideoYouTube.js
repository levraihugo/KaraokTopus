import { useRef, useState } from "react";
// import { Button, Alert, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

function GetTime(playerRef) {
  playerRef.current?.getCurrentTime().then((currentTime) => {
    return currentTime;
  });
}

export default function VideoYouTube(props) {
  const playerRef = useRef();
  // typescript
  // const playerRef = useRef<YoutubeIframeRef>(null);

  const [playing, setPlaying] = useState(false);
  const [timecode, setTimecode] = useState();
  let timerId = setInterval(() => {
    setTimecode(GetTime(playerRef));
  }, 100);

  let total = playerRef.current
    ?.getDuration()
    .then((getDuration) => console.log({ getDuration }));

  return (
    <>
      <YoutubePlayer
        ref={playerRef}
        width={props.width}
        play={playing}
        videoId={props.lien}
        // onChangeState={onStateChange}
      />
      <p>
        {timecode}/{total}
      </p>
    </>
  );
}
