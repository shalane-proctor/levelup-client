import { clientCredentials } from '../client';

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleGame = (gameId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${gameId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        maker: data.maker,
        skillLevel: data.skill_level,
        numberOfPlayers: data.number_of_players,
        title: data.title,
        gameTypeId: data.game_type,
      });
    })
    .catch((error) => reject(error));
});

const createGame = (game) => new Promise((resolve, reject) => {
  const gameObj = {
    maker: game?.maker,
    title: game?.title,
    number_of_players: Number(game?.numberOfPlayers),
    skill_level: Number(game?.skillLevel),
    game_type: Number(game?.gameTypeId),
    user_id: game?.user_id,
  };
  fetch(`${clientCredentials.databaseURL}/games`, {
    method: 'POST',
    body: JSON.stringify(gameObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gametypes`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getGames, getSingleGame, createGame, getGameTypes,
};
