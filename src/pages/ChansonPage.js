import { useRef, useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import VideoYouTube from "../composants/VideoYouTube";
import Paroles from "../composants/Paroles";
import * as SQLite from "expo-sqlite";
import { useParams } from "react-router";
import { GetChansonEtParoles } from "../services/BDDService";

function CalculerTemps(timecode) {
  // Change le temps depuis une chaîne de caractères à une valeur en millisecondes
  const temps = timecode.split(":");
  return (
    parseInt(temps[0]) * 60000 + parseInt(temps[1]) * 1000 + parseInt(temps[2])
  );
}

export default function ChansonPage() {
  // const id = useParams(); // Servira à récupérer la chanson à afficher
  const id = 1;
  const db = SQLite.useSQLiteContext(); // Base de données
  const [titre, setTitre] = useState(""); // Titre de la chanson
  const [artiste, setArtiste] = useState(""); // Artiste de la chanson
  const [lien, setLien] = useState(""); // Lien YouTube de la chanson
  const texte = useRef([""]); // Contient les paroles de la chanson
  const timecodes = useRef([""]); // Contient les timecodes des paroles
  const initialise = useRef(false); // Booléen pour savoir si la vidéo est prête à être lancée

  useEffect(() => {
    // Récupère les informations de la chanson choisie
    if (!initialise.current) {
      async function recupererInfos() {
        const resultat = await GetChansonEtParoles(id);
        if (resultat != null) {
          setTitre(resultat.Titre);
          setArtiste(resultat.Artiste);
          setLien(resultat.Lien.split("?v=")[1]); // le texte après ?v contient les informations nécessaires pour afficher la bonne vidéo
          texte.current = resultat.Texte.split("\n");
          timecodes.current = resultat.Timecodes.split("\n");
          initialise.current = true;
        }
      }
      recupererInfos();
    }
  }, []);

  const playerRef = useRef();
  const [tempsEcoule, setTempsEcoule] = useState(""); // Temps passé depuis le début de la vidéo
  const compteur = useRef(-1); // Sert à savoir quelles paroles afficher
  const ready = useRef(false);

  const setOnReady = useCallback(() => {
    ready.current = true;
  }, []);

  useEffect(() => {
    // Change la valeur du compteur pour trouver les paroles adaptées
    if (ready.current) {
      const tempsReel = tempsEcoule;
      if (tempsReel.length == 1) {
        // Sécurité
        tempsReel = ["00", "00", "000"];
      }
      compteur.current = Math.min(
        // Récupère le texte le plus proche du temps actuel de la vidéo
        Math.max(
          0, // Sécurité au cas où la fonction ne trouve rien
          timecodes.current.findLastIndex(
            (timecode) =>
              CalculerTemps(timecode) - CalculerTemps(tempsEcoule) < 0,
          ),
        ),
        timecodes.current.length - 1, // Sécurité pour ne pas prendre au delà des textes disponibles
      );
    }

    return () => {};
  }, [tempsEcoule]);

  useEffect(() => {
    // Calcule le temps écoulé depuis le début de la vidéo
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

  const [texte1, setTexte1] = useState("..."); // Paroles à chanter au temps T
  const [texte2, setTexte2] = useState("..."); // Prochaines paroles à chanter

  useEffect(() => {
    // À chaque changement du compteur, on change le texte à afficher
    setTexte1(texte.current[compteur.current]);
    setTexte2(
      texte.current[Math.min(compteur.current + 1, texte.current.length - 1)],
    );
  }, [compteur.current]);

  return (
    <View style={styles.container}>
      <Text>{titre}</Text>
      <Text>{artiste}</Text>
      <StatusBar style="auto" />
      <VideoYouTube
        width={300}
        height={169}
        lien={lien}
        playerRef={playerRef}
        tempsEcoule={tempsEcoule}
        playing={playing}
        onReady={setOnReady}
      />
      <Paroles texte1={texte1} texte2={texte2} />
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
