import "./App.css";
import Home from "./pages/Home";

const spotify_secret_key = process.env.REACT_APP_SPOTIFY_KEY;
console.log(spotify_secret_key);

export default function App() {
	return (
		<div className="container card__content">
			<Home />
		</div>
	);
}
