import React, { useState, ChangeEventHandler } from "react";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { addTracksToPlaylist, createPlaylist } from "../../lib/apiSpotify";
import { toast } from "react-toastify";
import {
	Flex,
	Heading,
	FormControl,
	Input,
	Center,
	Button,
} from "@chakra-ui/react";

interface CreatePlaylistFormProps {
	uriTracks: string[];
}

interface InitialFormState {
	title: string;
	description: string;
}

const CreatePlaylistForm = ({ uriTracks }: CreatePlaylistFormProps) => {
	const accessToken: string = useAppSelector(
		(state) => state.auth.accessToken
	);
	const userId: any = useAppSelector((state) => state.auth.user?.id);

	const [form, setForm] = useState<InitialFormState>({
		title: "",
		description: "",
	});

	const [errorForm, setErrorForm] = useState<InitialFormState>({
		title: "",
		description: "",
	});

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const { name, value } = e.target;

		setForm({ ...form, [name]: value });
		setErrorForm({ ...errorForm, [name]: "" });
	};

	const validateForm = () => {
		let isValid: boolean = true;

		if (form.title.length < 10) {
			setErrorForm({
				...errorForm,
				title: "Title must be at least 10 characters long",
			});
			isValid = false;
		}

		return isValid;
	};

	const handleSubmit: ChangeEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			try {
				const responseCreatePlaylist = await createPlaylist(
					accessToken,
					userId,
					{
						name: form.title,
						description: form.description,
					}
				);

				await addTracksToPlaylist(
					accessToken,
					responseCreatePlaylist.id,
					uriTracks
				);

				toast.success("Playlist created successfully");

				setForm({ title: "", description: "" });
			} catch (e) {
				toast.error("");
			}
		}
	};

	return (
		<Center>
			<Flex direction="column" pt={5} pb={5}>
				<Heading as="h2" size="xl" color="white">
					Create Playlist
				</Heading>

				<form onSubmit={handleSubmit}>
					<FormControl mt={5}>
						<Input
							w="400px"
							placeholder="Add a title here"
							bgColor="white"
							focusBorderColor="green.400"
							borderRadius="25"
							value={form.title}
							id="title-playlist"
							name="title"
							onChange={handleChange}
							required
						/>
					</FormControl>
					<FormControl mt={5}>
						<Input
							w="400px"
							placeholder="Add a description here"
							bgColor="white"
							focusBorderColor="green.400"
							borderRadius="25"
							value={form.description}
							id="description-playlist"
							name="description"
							onChange={handleChange}
							required
						/>
					</FormControl>
					<Button
						bgColor="green.500"
						color="white"
						_focus={{ boxShadow: "none" }}
						_hover={{ bgColor: "green.400" }}
						borderRadius="25"
						mt={5}
						type="submit"
					>
						Create
					</Button>
				</form>
			</Flex>
		</Center>
	);
};

export default CreatePlaylistForm;
