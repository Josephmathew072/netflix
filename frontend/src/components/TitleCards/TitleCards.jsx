import './TitleCards.css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TitleCards = ({ title = "Popular", category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  // useEffect(() => {
  //   fetch(`https://netflix-s87l.onrender.com/movies/${encodeURIComponent(category || "now_playing")}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     setApiData(data.results);
  //   })
  //     .catch(err => console.error(err));

  //   cardsRef.current.addEventListener('wheel', handleWheel);
  // }, [category]);



  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://netflix-s87l.onrender.com/api/movies', {
          params: { category }
        });
        setApiData(response.data.results);
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    fetchMovies();

    if (cardsRef.current) {
      cardsRef.current.addEventListener('wheel', handleWheel);
    }

    // Cleanup the event listener when the component is unmounted or category changes
    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]);

  return (
    <div className='title_cards'>
      <h2>{title}</h2>
      <div className="card_list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={'https://image.tmdb.org/t/p/w500' + card.backdrop_path} alt='' />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  );
};

export default TitleCards;
