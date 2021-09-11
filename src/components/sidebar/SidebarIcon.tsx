import React from "react";
import { useContext } from "react";
import { Store } from "../../management/Store";
import SVG from "react-inlinesvg";

const SidebarIcon = () => {
	const { state, dispatch, appState } = useContext(Store);

	return (
		<button
			className={"sidebar-icon " + (state.sidebar ? "fixed" : "")}
			onClick={() => dispatch({ type: "toggle-sidebar" })}
		>
			<SVG src="https://files.andresmarpz.com/arrow.svg" />
		</button>
	);
};

export default SidebarIcon;
