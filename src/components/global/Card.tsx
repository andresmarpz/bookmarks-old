import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { apiUrl } from "../../helper/Constants";
import { Store } from "../../management/Store";
import SVG from "react-inlinesvg";
import CopyToClipboard from "react-copy-to-clipboard";
import { Card as CardT } from "../../management/Store";

const Card = (props: {
	title: string;
	link: string;
	description?: string;
	collection: string;
	id: string;
	loading: boolean;
}) => {
	const { state, dispatch } = useContext(Store);
	const [loading, setLoading] = useState(props.loading);

	const handleClick = (event: any) => {
		event.preventDefault();

		window.open(props.link, "_blank");
	};

	const destroy = () => {
		setLoading(true);

		if (state.localStorage) {
			const cards = JSON.parse(localStorage.getItem("cards")!);
			const filtered = cards[props.collection].filter(
				(c: CardT) => c.id !== props.id
			);
			cards[props.collection] = filtered;

			localStorage.setItem("cards", JSON.stringify(cards));
			dispatch({ type: "remove-card", payload: props.id });
		} else {
			axios
				.post(apiUrl + "/delete/card", {
					card: {
						id: props.id,
						collection: props.collection,
					},
				})
				.then((res) => {
					if (res.status === 200)
						dispatch({ type: "remove-card", payload: props.id });
				});
		}
	};

	const copy = () => {};

	const getElements = (): JSX.Element[] => {
		const elements: JSX.Element[] = [];

		if (loading) {
			elements.push(
				<div key={Math.random()} className="card-dummy">
					<SVG
						width={64}
						height={64}
						src="https://files.andresmarpz.com/spinner1.svg"
					/>
				</div>
			);
		} else {
			elements.push(
				<div
					key={Math.random()}
					className="card-content"
					onClick={(event) => handleClick(event)}
				>
					<h4>{props.title}</h4>
					{props.description !== undefined && (
						<p>{props.description}</p>
					)}
				</div>
			);

			elements.push(
				<div className="card-toolbar" key={"t" + Math.random()}>
					<CopyToClipboard text={props.link}>
						<button className="copy-button">
							<SVG src="https://files.andresmarpz.com/copy.svg" />
						</button>
					</CopyToClipboard>
					<button className="delete-button" onClick={destroy}>
						x
					</button>
				</div>
			);
		}

		return elements;
	};

	return <div className="card">{getElements()}</div>;
};

export default Card;
