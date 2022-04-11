import React, { useState } from 'react';
import './index.css';

const Card = ({ imagesUrl, title, artist, select, toggleSelect }) => {
	const [isSelected, setIsSelected] = useState(select);

	const handleToggleSelect = () => {
		setIsSelected(!isSelected);
		toggleSelect();
	};

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
				<button className="card__button" onClick={handleToggleSelect}>
					<span className="card__button-icon">
						{isSelected ? (
							<i className="fa-solid fa-trash-can"></i>
						) : (
							<i className="fa-solid fa-plus"></i>
						)}
					</span>
					{isSelected ? 'Deselect' : 'Select'}
				</button>
			</div>
		</div>
	);
};

export default Card;
