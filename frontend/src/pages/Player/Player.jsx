import './Player.css';
import back_arrow from '../../assets/back_arrow_icon.png';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    premiered: "",
    type: ""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/movies/${id}/videos`)
      .then(response => response.json())
      .then(response => setApiData(response))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow} alt="" onClick={() => navigate(-1)} />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player_info">
        <p>{apiData.premiered?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
