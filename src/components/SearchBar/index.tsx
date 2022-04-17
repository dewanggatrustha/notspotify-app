import React, { useState, ChangeEventHandler, FormEventHandler } from "react";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { searchTrack } from "../../lib/apiSpotify";
import {
	Box,
	Flex,
	InputGroup,
	Input,
	InputLeftElement,
	Button,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

interface SearchBarProps {
	onSuccess: (tracks: any[], text: string) => void;
}

const SearchBar = ({ onSuccess }: SearchBarProps) => {
	const accessToken = useAppSelector((state) => state.auth.accessToken);

	const [text, setText] = useState("");

	const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
		setText(e.target.value);
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const response = await searchTrack(text, accessToken);
		try {
			const tracks = response.tracks.items;
			onSuccess(tracks, text);
		} catch (e) {
			toast.error("You need to search something..");
		}
	};

	return (
		<Box alignItems="center">
			<form onSubmit={handleSubmit}>
				<Flex>
					<InputGroup>
						<InputLeftElement
							pointerEvents="none"
							children={<FaSearch color="gray.300" />}
						/>
						<Input
							w="400px"
							placeholder="Search your Fav Songs..."
							type="text"
							bgColor="white"
							focusBorderColor="green.400"
							borderRadius="25"
							onChange={handleInput}
						/>
					</InputGroup>
					<Button
						bgColor="green.500"
						color="white"
						_focus={{ boxShadow: "none" }}
						_hover={{ bgColor: "green.400" }}
						borderRadius="25"
						ml={5}
						type="submit"
					>
						Search
					</Button>
				</Flex>
			</form>
		</Box>
	);
};

export default SearchBar;
