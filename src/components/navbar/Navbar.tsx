import { useContext, useEffect } from "react";
import { appStates, Store } from "../../management/Store";
import Icon from "../global/Icon";
import Login from "../global/Login";
import UserIcon from "./UserIcon";
import UserMenu from "./UserMenu";
import SidebarIcon from "../sidebar/SidebarIcon";

import { apiUrl } from "../../helper/Constants";
import LoginScreen from "../LoginScreen";

const Navbar = () => {
	const { state, dispatch, appState } = useContext(Store);

	const getElement = (): JSX.Element => {
		return (
			<span>
				<UserIcon />
				{state.userMenu && <UserMenu />}
			</span>
		);
	};

	let element = getElement();
	useEffect(() => {
		element = getElement();
	}, [state.authenticated]);

	return (
		<div className="navbar">
			{!state.authenticated && <span />}
			{state.authenticated && (
				<span className="collection-label">
					{appState === appStates.LOADED && <SidebarIcon />}
					<b>Collection:</b>
					<span>{state.collection.label}</span>
				</span>
			)}
			<span>{appState === appStates.LOADED && element}</span>
		</div>
	);
};

export default Navbar;
