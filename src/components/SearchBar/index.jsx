import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { searchTrack } from "../../lib/spotifyAPI";
import style from "./style.module.css";

const SearchBar = ({ onSuccess }) => {
	const accessToken = useSelector((state) => state.auth.accessToken);

	const [text, setText] = useState("");

	const handleInput = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await searchTrack(text, accessToken);

			const tracks = response.tracks.items;
			onSuccess(tracks);
		} catch (e) {
			toast.error(e);
		}
	};

	return (
		<form className={style.search} onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Search your favorite songs.."
				className={style.search__input}
				required
				onChange={handleInput}
			/>
			<button className={style.search__button} type="submit">
				<i class="fa-solid fa-magnifying-glass"></i>
			</button>
		</form>
	);
};

export default SearchBar;
