import chess from '../../assets/chess.png';

const Logo = () => {
  return (
    <div className="logo">
      <img src={chess} alt="chess logo" />
    </div>
  );
};

export default Logo;