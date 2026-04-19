import { openDatabaseAsync } from "expo-sqlite";

export const createDbIfNeeded = async () => {
  // Création de la base de données si elle n'existe pas encore sur l'appareil
  const db = await openDatabaseAsync("data.db");
  await db.execAsync(
    // Ajout de la table Chanson si elles n'existe pas
    "CREATE TABLE IF NOT EXISTS Chansons (ID INTEGER UNIQUE, Lien TEXT NOT NULL, Titre TEXT NOT NULL, Artiste TEXT, PRIMARY KEY(ID AUTOINCREMENT))",
  );
  try {
    await db.execAsync(
      // Ajout de la table Chanson si elles n'existe pas
      // Ajout d'une chanson pour le test de l'application
      'INSERT INTO Chansons VALUES (1, "https://www.youtube.com/watch?v=tJjxKhjR9H4", "Endless Possibility", "Jaret Reddick" )',
    );
  } catch (error) {
    console.log("Entrée déjà existante dans chansons");
  }
  await db.execAsync(
    // Ajout de la table Paroles si elles n'existe pas
    "CREATE TABLE IF NOT EXISTS Paroles (ID INTEGER UNIQUE, Texte TEXT NOT NULL, Timecodes TEXT NOT NULL, ID_Chanson INTEGER, PRIMARY KEY(ID AUTOINCREMENT), FOREIGN KEY(ID_Chanson) REFERENCES Chansons (ID))",
  );
  try {
    await db.execAsync(
      // Ajout de paroles pour le test de l'application
      "INSERT INTO Paroles VALUES (1, \"...\nThis is my escape\nI'm running through this world\nAnd I'm not looking back!\n'Cause I know I can go\nWhere no one's ever gone\nAnd I'm not looking back!\nBut how will I know when I get there ?\nAnd how will I know when to leave ?\nWe've all gotta start from somewhere\nAnd it's right there for me\nThe possibilities are neverending!\nI see it\nI see it\nAnd now it's all within my reach\n(Endless Possibility)\nI see it\nI see it now!\nIt's always been inside of me\n(And now I feel so free!)\nEndless Possibility!\n...\nAnd so I'll carry on\nMy time to shine has come\nI feel it!\nAs fast as I can go\nStraight to the top I know\nYou'll see it!\nSo please wake me up when I'll get there\nIt feels like I'm lost in a dream\nI know in my heart that it's my time\nAnd I already see\nThe possibilities are neverending!\nI see it\nI see it\nAnd now it's all within my reach\n(Endless Possibility)\nI see it\nI see it now!\nIt's always been inside of me\n(And now I feel so free!)\nEndless Possibility!\n...\nDrop that smile 'cause you're beaten again\nNo this is where my journey begins!\n...\nYou're losing speed, you're losing your flow\nBut inside me there's a power you'll never know!\nThen let it out, it's inside you\nYou better all stand out 'cause I'm coming through!\n...\nI see it\nI see it\nAnd now it's all within my reach\nI see it\nI see it now!\nIt's always been inside of me\nI see it\nI see it\nAnd now it's all within my reach\n(Endless Possibility)\nI see it\nI see it now!\nIt's always been inside of me\n(And now I feel so free!)\nEndless Possibility!\n(Endless Possibility)\nEndless Possibility!\n(Endless Possibility)\nEndless Possibility!\", \"00:00:200\n00:18:400\n00:20:400\n00:22:000\n00:27:500\n00:29:750\n00:31:250\n00:36:500\n00:41:100\n00:45:750\n00:49:100\n00:51:500\n00:55:500\n00:56:600\n00:57:800\n01:00:800\n01:04:750\n01:06:000\n01:07:100\n01:10:150\n01:12:350\n01:14:500\n01:23:250\n01:25:500\n01:27:400\n01:32:500\n01:34:700\n01:36:800\n01:41:200\n01:45:750\n01:50:400\n01:54:000\n01:56:250\n02:00:200\n02:01:400\n02:02:500\n02:05:400\n02:09:500\n02:10:550\n02:11:700\n02:14:800\n02:16:900\n02:19:000\n02:32:200\n02:34:200\n02:37:000\n02:41:200\n02:43:500\n02:45:700\n02:48:100\n02:53:000\n03:11:700\n03:12:900\n03:14:000\n03:21:000\n03:22:100\n03:23:250\n03:30:200\n03:31:400\n03:32:500\n03:35:400\n03:39:400\n03:40:500\n03:41:700\n03:44:800\n03:46:800\n03:49:200\n03:51:500\n03:53:400\n03:56:100\", 1)",
    );
  } catch (error) {
    console.log("Entrée déjà existante dans paroles");
  }
  await db.closeAsync();
};

export async function GetParoles(id) {
  // Renvoie les informations de paroles à partir de son id
  const db = await openDatabaseAsync("data.db");

  try {
    const resultat = await db.getFirstAsync(
      "SELECT ID, Texte, Timecodes, ID_Chanson FROM Paroles WHERE ID == " + id,
    );
    await db.closeAsync();
    return resultat;
  } catch (error) {
    console.log("Erreur dans la récupération des données");
    await db.closeAsync();
    return null;
  }
}

export async function GetChanson(id) {
  // Renvoie les informations d'une chanson à partir de son id
  const db = await openDatabaseAsync("data.db");

  try {
    const resultat = await db.getFirstAsync(
      "SELECT ID, Lien, Titre, Artiste FROM Chansons WHERE ID == " + id,
    );
    await db.closeAsync();
    return resultat;
  } catch (error) {
    console.log("Erreur dans la récupération des données");
    await db.closeAsync();
    return null;
  }
}

export async function GetChansonFromTitre(titre) {
  // Renvoie les informations d'une chanson à partir de son titre
  const db = await openDatabaseAsync("data.db");

  try {
    const resultat = await db.getFirstAsync(
      "SELECT ID, Lien, Titre, Artiste FROM Chansons WHERE Titre Like %" +
        titre +
        "%",
    );
    await db.closeAsync();
    return resultat;
  } catch (error) {
    console.log("Erreur dans la récupération des données");
    await db.closeAsync();
    return null;
  }
}

export async function GetChansonEtParoles(id) {
  // Renvoie les informations nécessaires pour la page d'affichage des paroles
  const db = await openDatabaseAsync("data.db");

  try {
    const resultat = await db.getFirstAsync(
      "SELECT Chansons.ID, Paroles.ID, Titre, Artiste, Lien, Texte, Timecodes FROM Chansons, Paroles WHERE Chansons.Id == Paroles.ID_Chanson AND Chansons.Id == " +
        id,
    );
    await db.closeAsync();
    return resultat;
  } catch (error) {
    console.log("Erreur dans la récupération des données");
    await db.closeAsync();
    return null;
  }
}

export async function GetParolesFromChanson(id) {
  // Renvoie les informations de différentes paroles à partir d'un id de chanson
  const db = await openDatabaseAsync("data.db");

  try {
    const resultat = await db.getFirstAsync(
      "SELECT ID, Texte, Timecodes FROM Paroles WHERE ID_Chanson == " + id,
    );
    await db.closeAsync();
    return resultat;
  } catch (error) {
    console.log("Erreur dans la récupération des données");
    await db.closeAsync();
    return null;
  }
}

export async function AddChanson(chanson) {
  // Ajout d'une chanson dans la BDD
  const db = await openDatabaseAsync("data.db");

  try {
    await db.runAsync(
      "INSERT INTO Chansons (Lien, Titre, Artiste) VALUES ($lien, $titre, $artiste)",
      { $lien: chanson.Lien, $titre: chanson.Titre, $artiste: chanson.Artiste },
    );
  } catch (error) {
    console.log(error);
    console.log("Erreur dans la récupération des données");
  } finally {
    await db.closeAsync();
  }
}

export async function AddParoles(paroles) {
  // Ajout de paroles dans la BDD
  const db = await openDatabaseAsync("data.db");

  try {
    await db.runAsync(
      "INSERT INTO Paroles (Texte, Timecodes, ID_Chanson) VALUES ($texte, $timecodes, $id_chanson)",
      {
        $texte: paroles.Texte,
        $timecodes: paroles.Timecodes,
        $id_chanson: paroles.Id_Chanson,
      },
    );
  } catch (error) {
    console.log(error);
    console.log("Erreur dans la récupération des données");
  } finally {
    await db.closeAsync();
  }
}

export async function UpdateChanson(chanson) {
  // Mise à jour des informations d'une chanson dans la BDD
  const db = await openDatabaseAsync("data.db");

  try {
    await db.runAsync(
      "UPDATE Chansons SET Lien = $lien, Titre = $titre, Artiste = $artiste WHERE ID = $id",
      {
        $lien: chanson.Lien,
        $titre: chanson.Titre,
        $artiste: chanson.Artiste,
        $id: chanson.ID,
      },
    );
  } catch (error) {
    console.log(error);
    console.log("Erreur dans la récupération des données");
  } finally {
    await db.closeAsync();
  }
}

export async function UpdateParoles(paroles) {
  // Mise à jour des informations de paroles dans la BDD
  const db = await openDatabaseAsync("data.db");

  try {
    await db.runAsync(
      "UPDATE Paroles SET Texte = $texte, Timecodes = $timecodes, ID_Chanson = $id_chanson WHERE ID = $id",
      {
        $texte: paroles.Texte,
        $timecodes: paroles.Timecodes,
        $id_chanson: paroles.Id_Chanson,
        $id: paroles.ID,
      },
    );
  } catch (error) {
    console.log(error);
    console.log("Erreur dans la récupération des données");
  } finally {
    await db.closeAsync();
  }
}

export async function DeleteChanson(id) {
  // Suppression d'une chanson dans la base de données
  const db = await openDatabaseAsync("data.db");

  try {
    await db.runAsync("DELETE FROM Chansons WHERE ID = $id", { $id: id });
  } catch (error) {
    console.log("Erreur dans la suppression des données");
  } finally {
    await db.closeAsync();
  }
}

export async function DeleteParoles(id) {
  // Suppression de paroles dans la base de données
  const db = await openDatabaseAsync("data.db");

  try {
    await db.runAsync("DELETE FROM Paroles WHERE ID = $id", { $id: id });
  } catch (error) {
    console.log("Erreur dans la suppression des données");
  } finally {
    await db.closeAsync();
  }
}
