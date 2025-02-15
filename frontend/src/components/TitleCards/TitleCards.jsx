import './TitleCards.css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const TitleCards = ({ title = "Popular", category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`http://localhost:5000/movies/${encodeURIComponent(category || "now_playing")}`)
      .then(response => response.json())
      .then(response => setApiData(response.Search || []))
      .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
  }, [category]);

  return (
    <div className='title_cards'>
      <h2>{title}</h2>
      <div className="card_list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.imdbID}`} className='card' key={index}>
            <img src={card.Poster} alt='' />
            <p>{card.Title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
