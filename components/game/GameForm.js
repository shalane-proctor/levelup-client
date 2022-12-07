import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes } from '../../utils/data/gameData';

const GameForm = ({ user }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const initialState = {
    skillLevel: 1,
    numberOfPlayers: 1,
    title: '',
    maker: '',
    gameTypeId: 0,
    user_id: 1,
  };
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGameTypes().then(setGameTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    console.warn(currentGame, user);
    const game = {
      title: currentGame.title,
      maker: currentGame.maker,
      numberOfPlayers: currentGame.numberOfPlayers,
      skillLevel: currentGame.skillLevel,
      gameTypeId: currentGame.gameTypeId,
      user_id: user.uid,
    };

    // Send POST request to your API
    createGame(game).then(() => router.push('/'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" type="number" required value={currentGame.numberOfPlayers} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Skill Level (1-10)</Form.Label>
          <Form.Control name="skillLevel" type="number" required value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select name="gameTypeId" onChange={handleChange}>
            <option>Open this select menu</option>
            {gameTypes?.map((gameType) => (
              <option key={gameType.id} value={gameType.id} selected={currentGame.gameTypeId === gameType.id}>
                {gameType.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    numberOfPlayers: PropTypes.number,
    skillLevel: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    gameTypeId: PropTypes.number,
  }),
};

GameForm.defaultProps = {
  gameObj: PropTypes.shape({
    id: '',
    numberOfPlayers: '',
    skillLevel: '',
    title: '',
    maker: '',
    gameTypeId: '',
  }),
};

export default GameForm;
