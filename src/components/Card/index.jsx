import React from "react";
import "./index.css";

const Card = ({ imagesUrl, title, artist }) => {
	return (
		<div className="card__wrapper">
			<div className="card__images">
				<img src={imagesUrl} alt={title} className="card__image" />
			</div>
			<div className="card__info">
				<h5>{title}</h5>
				<p>{artist}</p>
			</div>
			<div className="button__wrapper">
				<button className="card__button">
					<a href="#">Select</a>
				</button>
			</div>
		</div>
	);
};

export default Card;
