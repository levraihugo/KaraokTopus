import { useRef, useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import VideoYouTube from "../VideoYouTube";
import Paroles from "../Paroles";
import * as SQLite from "expo-sqlite";
import { useParams } from "react-router";
import {
  createDbIfNeeded,
  GetChansonEtParoles,
  UpdateParoles,
} from "../services/chansonService";

function CalculerTemps(timecode) {
  const temps = timecode.split(":");
  return (
    parseInt(temps[0]) * 60000 + parseInt(temps[1]) * 1000 + parseInt(temps[2])
  );
}

export default function ChansonPage() {
  // const id = useParams();
  const id = 1;
  const db = SQLite.useSQLiteContext();
  const [titre, setTitre] = useState("");
  const [artiste, setArtiste] = useState("");
  const [lien, setLien] = useState("");
  const texte = useRef([""]);
  const timecodes = useRef([""]);
  const initialise = useRef(false);

  useEffect(() => {
    if (!initialise.current) {
      async function recupererInfos() {
        const resultat = await GetChansonEtParoles(id);
        if (resultat != null) {
          setTitre(resultat.Titre);
          setArtiste(resultat.Artiste);
          setLien(resultat.Lien.split("?v=")[1]);
          texte.current = resultat.Texte.split("\n");
          timecodes.current = resultat.Timecodes.split("\n");
          initialise.current = true;
        }
      }
      recupererInfos();
    }
  }, []);

  const playerRef = useRef();
  const [tempsEcoule, setTempsEcoule] = useState("");
  const compteur = useRef(-1);
  const ready = useRef(false);

  const setOnReady = useCallback(() => {
    ready.current = true;
  }, []);

  useEffect(() => {
    // const interval1 = setInterval(async () => {
    if (ready.current) {
      const tempsReel = tempsEcoule;
      if (tempsReel.length == 1) {
        tempsReel = ["00", "00", "000"];
      }
      compteur.current = Math.min(
        Math.max(
          0,
          timecodes.current.findLastIndex(
            (timecode) =>
              CalculerTemps(timecode) - CalculerTemps(tempsEcoule) < 0,
          ),
        ),
        timecodes.current.length - 1,
      );
      // majTextes();
    }
    // }, 100);

    return () => {
      // clearInterval(interval1);
    };
  }, [tempsEcoule]);

  useEffect(() => {
    const interval2 = setInterval(async () => {
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
      clearInterval(interval2);
    };
  }, []);

  const [playing, setPlaying] = useState(false);

  const [texte1, setTexte1] = useState("...");
  const [texte2, setTexte2] = useState("...");

  useEffect(() => {
    setTexte1(texte.current[compteur.current]);
    setTexte2(
      texte.current[Math.min(compteur.current + 1, texte.current.length - 1)],
    );
  }, [compteur.current]);

  return (
    <View style={styles.container}>
      {/* <SQLite.SQLiteProvider
        databaseName="data.db"
        // directory="../assets"
        // onInit={createDbIfNeeded}
        // assetSource={{ assetId: require("../assets/data.db") }}
      > */}
      <Text>{titre}</Text>
      <Text>{artiste}</Text>
      <StatusBar style="auto" />
      <VideoYouTube
        width={300}
        height={169}
        // lien="tJjxKhjR9H4"
        lien={lien}
        playerRef={playerRef}
        tempsEcoule={tempsEcoule}
        playing={playing}
        onReady={setOnReady}
        // ready={ready.current}
      />
      <Paroles texte1={texte1} texte2={texte2} />
      {/* </SQLite.SQLiteProvider> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
