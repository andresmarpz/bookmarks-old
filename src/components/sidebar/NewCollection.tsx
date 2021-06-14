import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import SVG from 'react-inlinesvg'; 
import { apiUrl } from '../../helper/Constants';
import { Store } from '../../management/Store';

const NewCollection = () => {

	const [focus, setFocus] = useState(false);
	const {state, dispatch} = useContext(Store);

	const [value, setValue] = useState('');

	const handleInput = (e: any) => {
		e.preventDefault();
		setValue('');

		axios.post(apiUrl +'/add/collection', {
			'collection': value
		}).then(res => {
			dispatch({ type: 'add-collection', payload: res.data });
		});

		setFocus(false);
	}

	if(focus)
		return (
			<form onSubmit={(e) => handleInput(e)}>
				<input value={value} onChange={(e) => setValue(e.currentTarget.value)} className='new-collection-input' autoFocus onBlur={() => setFocus(false)} placeholder='Name..' />
			</form>)
		;
	else
		return (
			<button onFocus={() => setFocus(true)} className='new-collection' onClick={() => dispatch({type: 'toggle-new'})}>
						<SVG height={16} width={16} src='https://andres.run/files/plus2.svg' />
						New collection
			</button>
		);
}
 
export default NewCollection