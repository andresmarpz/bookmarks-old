import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { useContext } from 'react';
import { apiUrl } from '../../helper/Constants';
import { Store } from '../../management/Store';
 
const New = () => {

	const {state, dispatch} = useContext(Store);

	const initialState = {
		title: '',
		description: '',
		link: '',
		category: ''
	}

	type actionType = 
		| { type: 'change-value', target: string, payload: string }
		| { type: 'clear-values' }

	const reducer = (state: typeof initialState, action: actionType) => {
		switch(action.type){
			case 'change-value':
				return {...state, [action.target]: action.payload};
			case 'clear-values':
				return initialState;
		}
	}

	const [values, handleChange] = useReducer(reducer, initialState);

	const handleSubmit = (event: any) => {
		event.preventDefault();

		if(values.title === '' || values.link === '') return;

		handleChange({ type: 'clear-values' });

		axios.post(apiUrl +'/add/card', {
			card: {
				title: values.title,
				description: values.description,
				link: values.link,
				category: values.category
			}
		}).then(res => {
			dispatch({type: 'add-card', payload: {
				title: values.title,
				description: values.description,
				link: values.title,
				category: values.category,
				id: res.data
			}})
		});
	}

    return (
		<div>
			<form className='new-form' onSubmit={handleSubmit}>
				<input value={values.title} placeholder='Title' className='new-form-input' onChange={(e) => handleChange({ type: 'change-value', target: 'title', payload: e.target.value })}/>
				<input value={values.description} placeholder='Description' className='new-form-input' onChange={(e) => handleChange({ type: 'change-value', target: 'description', payload: e.target.value })}/>
				<input value={values.link} placeholder='Link' className='new-form-input' onChange={(e) => handleChange({ type: 'change-value', target: 'link', payload: e.target.value })}/>
				<select><option>Test</option></select>
				<button>GO</button>
			</form>
		</div>
    );
}
 
export default New