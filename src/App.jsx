import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import SideBar from "./components/SideBar";
import CreatePlaylist from "./pages/Playlist/CreatePlaylist";
import LoginPage from "./pages/Main/LoginPage";
import "./App.css";

export default function App() {
	const token = useSelector((state) => state.auth.accessToken);

	return (
		<div className="container">
			<Router>
				<SideBar />
				<Switch>
					<Route path="/create-playlist">
						{token !== "" ? <CreatePlaylist /> : <Redirect to="/" />}
					</Route>
					<Route exact path="/">
						{token !== "" ? (
							<Redirect to="/create-playlist" />
						) : (
							<LoginPage />
						)}
					</Route>
				</Switch>
			</Router>
		</div>
	);
}
