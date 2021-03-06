import assert from "assert";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useReducer, useState } from "react";
import Card from "../components/global/Card";
import { apiUrl, domain } from "../helper/Constants";
import isDev from "../helper/Environment";

export interface Card {
	title: string;
	link: string;
	description?: string;
	collection: string;
	id: string;
}

interface User {
	username: string;
	id: string;
}

interface Collection {
	label: string;
}

const defCollection: Collection = {
	label: "General",
};

const initialState = {
	sidebar: false,
	authenticated: false,
	localStorage: false,
	new: false,
	userMenu: false,
	user: {} as User,
	collections: [] as string[],
	collection: defCollection,
	cards: [] as Card[],
};

type actionType =
	| { type: "authenticate"; payload: User }
	| { type: "add-card"; payload: Card }
	| { type: "add-dummy"; payload: Collection }
	| { type: "add-collection"; payload: string }
	| { type: "change-collection"; payload: Collection }
	| { type: "replace-dummy"; payload: Card }
	| { type: "remove-card"; payload: string }
	| { type: "toggle-menu" }
	| { type: "toggle-sidebar" }
	| { type: "toggle-new" }
	| { type: "useLocalStorage" };

const reducer = (state: typeof initialState, action: actionType) => {
	switch (action.type) {
		case "authenticate":
			return { ...state, authenticated: true, user: action.payload };
		case "replace-dummy":
			const index = state.cards.findIndex((card) => card.id === "dummy");
			state.cards.splice(index, 1, action.payload);

			return { ...state };
		case "add-dummy":
			const card: Card = {
				title: "Loading..",
				description: "...",
				link: "",
				collection: action.payload.label,
				id: "dummy",
			};

			return { ...state, cards: [...state.cards, card] };
		case "add-card":
			return { ...state, cards: [...state.cards, action.payload] };
		case "add-collection":
			return {
				...state,
				collections: [...state.collections, action.payload],
			};
		case "change-collection":
			return { ...state, collection: action.payload };
		case "remove-card":
			const cards = state.cards.filter(
				(card) => card.id !== action.payload
			);
			return { ...state, cards: cards };
		case "toggle-menu":
			return { ...state, userMenu: !state.userMenu };
		case "toggle-sidebar":
			return { ...state, sidebar: !state.sidebar };
		case "toggle-new":
			return { ...state, new: !state.new };
		case "useLocalStorage":
			return { ...state, localStorage: true };
	}
};

export enum appStates {
	LOADING,
	LOADED,
}

interface ContextTypes {
	state: typeof initialState;
	dispatch: React.Dispatch<actionType>;
	appState: appStates;
}

export const Store = React.createContext<ContextTypes>({
	state: initialState,
	dispatch: () => {},
	appState: appStates.LOADING,
});

const StoreJSX = ({ children }: any) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const [appState, setAppState] = useState(appStates.LOADING);

	const value = { state, dispatch, appState };

	useEffect(() => {
		Cookies.set(
			"nextUrl",
			isDev()
				? "http://bookmarks.local.test"
				: "https://bookmarks.andresmarpz.com",
			{
				domain: domain,
			}
		);

		axios.defaults.withCredentials = true;
		axios.get(apiUrl + "/auth").then((res) => {
			if (res.status === 200) {
				if (res.data.title === "TRUE") {
					dispatch({
						type: "authenticate",
						payload: {
							username: res.data.message.username,
							id: String(res.data.message.id),
						},
					});

					const collections = axios
						.get(apiUrl + "/get/collections")
						.then((res) => {
							const cols = res.data.collections;
							Object.keys(cols).forEach((key) => {
								dispatch({
									type: "add-collection",
									payload: key,
								});

								cols[key].forEach((card: Card) => {
									dispatch({
										type: "add-card",
										payload: card,
									});
								});
							});
						});

					const avatar = axios.get(
						`https://avatars.githubusercontent.com/u/${res.data.message.id}?v=4`,
						{
							withCredentials: false,
						}
					);
					const svg = axios.get(
						"https://files.andresmarpz.com/plus.svg",
						{
							withCredentials: false,
						}
					);
					const arrow = axios.get(
						"https://files.andresmarpz.com/arrow.svg",
						{
							withCredentials: false,
						}
					);

					Promise.allSettled([collections, avatar, svg, arrow]).then(
						() => {
							setAppState(appStates.LOADED);
						}
					);
				} else setAppState(appStates.LOADED);

				return res.data;
			}
		});
	}, []);

	useEffect(() => {
		if (state.localStorage) {
			dispatch({
				type: "authenticate",
				payload: { username: "Local", id: "0000" },
			});

			if (localStorage.getItem("cards") == null) {
				localStorage.setItem(
					"cards",
					JSON.stringify({
						General: [],
					})
				);
			}

			const cards = JSON.parse(localStorage.getItem("cards")!);

			Object.keys(cards).forEach((key: string) => {
				dispatch({
					type: "add-collection",
					payload: key,
				});

				cards[key].forEach((card: Card) => {
					dispatch({
						type: "add-card",
						payload: card,
					});
				});
			});

			setAppState(appStates.LOADED);
		}
	}, [state.localStorage]);

	return <Store.Provider value={value}>{children}</Store.Provider>;
};

export default StoreJSX;
