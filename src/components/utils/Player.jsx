import { useStore } from '../../context/store';
import styles from '../../styles/utils/Player.module.css';

const Player = () => {
  const { challenge, set } = useStore('challenge');
  const handleChange = (player) => {
    const challengeInfo = {
      by: {
        email: challenge.by.email,
        playAs: player,
      },
      to: {
        email: challenge.to.email,
        playAs: player === 'White' ? 'Black' : 'White',
      },
      accepted: false,
    };
    set({
      challenge:challengeInfo,
    });
  };

  return (
    <fieldset className={styles.player}>
      <legend>play as</legend>

      <div>
        <input
          type="radio"
          id="White"
          name="player"
          value="White"
          className="btn"
          onChange={() =>handleChange("White")}
        />
        <label htmlFor="White">White</label>
      </div>

      <div>
        <input
          type="radio"
          id="Black"
          name="player"
          value="Black"
          onChange={() =>handleChange("Black")}
        />
        <label htmlFor="Black">Black</label>
      </div>
    </fieldset>
  );
}

export default Player;
