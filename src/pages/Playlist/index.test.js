import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../Redux/store";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import config from "../../lib/config";
import CreatePlaylist from "./CreatePlaylist";
import { ChakraProvider } from "@chakra-ui/react";

const testRender = () =>
	render(
		<ChakraProvider>
			<Provider store={store}>
				<CreatePlaylist />
			</Provider>
		</ChakraProvider>
	);

const server = setupServer(
	rest.get(`${config.SPOTIFY_BASE_URL}/search`, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				tracks: {
					items: [
						{
							id: "1",
							album: {
								images: [
									{
										url: "https://i.scdn.co/image/ab67616d0000b2737d6f5f316cb00b678e32a207",
									},
								],
							},
							name: "This is Title",
							artists: [
								{
									name: "This is Artist",
								},
							],
							uri: "test",
						},
					],
				},
			})
		);
	})
);

describe("Render Create Playlist Page", () => {
	beforeAll(() => server.listen());
	beforeEach(testRender);
	afterAll(() => server.close());
	afterEach(() => {
		server.resetHandlers();
		cleanup();
	});

	it("Component with Data Rendered Successfully", async () => {
		const searchInput = screen.getByPlaceholderText(
			/Search your Fav Songs.../i
		);
		const searchButton = screen.getByRole("button", {
			name: /Search/i,
		});

		userEvent.type(searchInput, "Honne");
		expect(searchInput).toBeInTheDocument();

		userEvent.click(searchButton);

		await screen.findByText(/This is Title/i);

		const images = screen.getAllByAltText(/This is Title/i);
		const title = screen.getByText(/This is Title/i);
		const artist = screen.getByText(/This is Artist/i);

		expect(images).toBeTruthy();
		expect(title).toBeInTheDocument();
		expect(artist).toBeInTheDocument();
	});
});
