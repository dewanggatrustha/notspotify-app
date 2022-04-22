import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { logout } from "../../Redux/authSlice";
import { getUserProfile } from "../../lib/apiSpotify";
import {
	Flex,
	Avatar,
	Text,
	MenuButton,
	Menu,
	MenuList,
	MenuItem,
	Button,
	AvatarBadge,
} from "@chakra-ui/react";
import { FaAngleDown, FaSignOutAlt, FaUserAlt } from "react-icons/fa";

const ProfileBar = () => {
	const userProfile = useAppSelector((state) => state.auth.user);
	const token = useAppSelector((state) => state.auth.accessToken);
	const dispatch = useAppDispatch();

	useEffect(() => {
		getUserProfile(token);
	}, [token]);

	const handleProfile = () => {
		window.open(userProfile?.external_urls.spotify);
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<Flex alignItems="center" bgColor="gray.800" rounded={25} p={1}>
			<Menu>
				<MenuButton
					as={Button}
					rightIcon={<FaAngleDown />}
					color="white"
					bgColor="black"
					rounded={25}
					_focus={{ boxShadow: "none" }}
					_active={{ bg: "black" }}
					_hover={{ bg: "gray.700" }}
				>
					<Flex alignItems="center">
						<Avatar src={userProfile?.images[0].url} size="sm">
							<AvatarBadge
								boxSize="12px"
								bg="green.500"
								borderColor="green.600"
							/>
						</Avatar>
						<Text ml={4} fontSize="sm" color="white">
							{userProfile?.display_name}
						</Text>
					</Flex>
				</MenuButton>
				<MenuList
					color="white"
					bgColor="black"
					rounded={10}
					_active={{ bg: "gray.800" }}
				>
					<MenuItem
						icon={<FaUserAlt />}
						iconSpacing={3}
						onClick={handleProfile}
						_hover={{ bg: "gray.700" }}
					>
						Go to Profile
					</MenuItem>
					<MenuItem
						icon={<FaSignOutAlt />}
						iconSpacing={3}
						onClick={handleLogout}
						_hover={{ bg: "gray.700" }}
					>
						Logout
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
};

export default ProfileBar;
