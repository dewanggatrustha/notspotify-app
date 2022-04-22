import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { useAppSelector } from "./Redux/hooks";
import CreatePlaylist from "./pages/Playlist/CreatePlaylist";
import LoginPage from "./pages/Main/LoginPage";
import SideBar from "./components/SideBar";

export default function App() {
	const token = useAppSelector((state) => state.auth.accessToken);

	return (
		<>
			<Router>
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
		</>
	);
}
