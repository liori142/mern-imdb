import React, { useState } from "react";
import "./Card.css";

export default function Card(props) {
  const [selectedBG,setSelectedBG] = useState('https://wallpapercave.com/wp/wp5758736.jpg')
  const { title, backdrop_path, vote_average, release_date, overview, trailer, genres } = props.movie;
  
  const changeToMovieBackground = (e) => {
    const rdyImg = e.target.offsetParent.className === 'card' ? e.target.offsetParent : e.target
    setSelectedBG(`url(${rdyImg.querySelector('img').src})`)
    const appBackground = document.querySelector(".App").style;
    appBackground.backgroundImage = `url(${rdyImg.querySelector('img').src})`;
    appBackground.backgroundSize = "cover"
    appBackground.backgroundAttachment = "fixed"
    appBackground.backgroundPosition = "center"
  }
  const changeBackgroundBack = () => {
    const appBackground = document.querySelector(".App").style;
    appBackground.backgroundImage = selectedBG;
    appBackground.backgroundSize = "cover"
    appBackground.backgroundAttachment = "fixed"
    appBackground.backgroundPosition = "center"
  }
  const RatingStars = () => {
    let starArray = [];
    for (let i = 0; i < Math.floor(vote_average / 2); i++) {
      starArray.push(<i key={i} className="fas fa-star"></i>)
    }
    return <p className="stars">{starArray}</p>;
  };
  return (
    <div className="card" onMouseEnter={changeToMovieBackground} onMouseOut={changeBackgroundBack}>
      <div className="imgBox">
        <img
          src={backdrop_path}
          alt=""
        />
      </div>
      <div className="text">
        <div className="title">
          <h1>{title}</h1>
          <p>{release_date}</p>
        </div>
        <div className="top">
          <h3>Summary</h3>
          <RatingStars />
        </div>
        <div className="summary">{overview}</div>
      </div>
      <span className="trailer"><a href={trailer} target="_blank">Trailer<i className="fab fa-youtube"></i></a></span>
    </div>

  );
}
Card.defaultProps = {
  name: "Name",
  imageUrl: "ImgUrl",
  rating: "Type",
  year: "Url",
};
