import React from "react";
import SideBar from "../SideBar";
import { Flex, Box } from "@chakra-ui/react";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<Flex flexDirection="column">
			<SideBar />
			<Box ml="350px">{children}</Box>
		</Flex>
	);
};

export default Layout;
