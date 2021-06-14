import React from 'react';
import { useContext } from 'react';
import SVG from 'react-inlinesvg'; 
import { Store } from '../../management/Store';

const Toolbar = () => {

	const {state, dispatch} = useContext(Store);

    return (
		<div className='toolbar'>
			<button className='toolbar-new' onClick={() => dispatch({ type: 'toggle-new' })}>
				<SVG width={20} height={20} src='https://andres.run/files/plus2.svg'/>
			</button>
		</div>
    );
}
 
export default Toolbar