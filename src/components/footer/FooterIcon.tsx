import React from 'react';
 
import SVG from 'react-inlinesvg';

const FooterIcon = (props: { icon: string, onClick?(): void }) => {
    return (
		<div>
			<button className='footer-icon' onClick={props.onClick}><SVG src={props.icon} style={{fill: 'white'}}/></button>
		</div>
    );
}
 
export default FooterIcon 