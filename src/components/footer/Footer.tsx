import { useState } from "react";

import FooterIcon from "./FooterIcon";
import New from "./New";

const Footer = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className={"footer " + (open ? "footer-open" : "footer-close")}>
			{open && (
				<div>
					<div
						className="close-button"
						onClick={() => setOpen(false)}
					>
						‏‏‎ ‎
					</div>
					<New />
				</div>
			)}
			{!open && (
				<div>
					<FooterIcon
						onClick={() => {
							setOpen(true);
						}}
						icon="https://files.andresmarpz.com/plus.svg"
					/>
				</div>
			)}
		</div>
	);
};

export default Footer;
