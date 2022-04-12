import React, { useState } from "react";
import style from "./style.module.css";

const Card = ({ imagesUrl, title, artist, select, toggleSelect }) => {
	const [isSelected, setIsSelected] = useState(select);

	const handleToggleSelect = () => {
		setIsSelected(!isSelected);
		toggleSelect();
	};

	return (
		<div className={style.card__wrapper}>
			<div className={style.card__images}>
				<img src={imagesUrl} alt={title} className={style.card__image} />
			</div>
			<div className={style.card__info}>
				<h5>{title}</h5>
				<p>{artist}</p>
			</div>
			<div className={style.button__wrapper}>
				<button className={style.card__button} onClick={handleToggleSelect}>
					<span className={style.card__button__icon}>
						{isSelected ? (
							<i className="fa-solid fa-trash-can"></i>
						) : (
							<i className="fa-solid fa-plus"></i>
						)}
					</span>
					{isSelected ? "Deselect" : "Select"}
				</button>
			</div>
		</div>
	);
};

export default Card;
