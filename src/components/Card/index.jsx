import React from "react";
import "./index.css";

const Card = ({ imagesUrl, title, artist, songUrl }) => {
	return (
		<div className="card__wrapper">
			<img src={imagesUrl} alt={title} className="card__image" />
			<div className="card__info">
				<h3>{title}</h3>
				<p>{artist}</p>
			</div>
			<div className="button__wrapper">
				<button className="card__button">
					<a href={songUrl} target="_blank" rel="noreferrer">
						Select
					</a>
				</button>
			</div>
		</div>
	);
};

export default Card;
