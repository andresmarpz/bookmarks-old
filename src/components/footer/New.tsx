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
		collection: 'General'
	}

	type actionType = 
		| { type: 'change-value', target: string, payload: string }
		| { type: 'clear-values' }

	const reducer = (state: typeof initialState, action: actionType) => {
		switch(action.type){
			case 'change-value':
				return {...state, [action.target]: action.payload};
			case 'clear-values':
				return {...state, title: '', description: '', link: ''};
		}
	}

	const [values, handleChange] = useReducer(reducer, initialState);

	const handleSubmit = (event: any) => {
		event.preventDefault();

		if(values.title === '' || values.link === '') return;

		handleChange({ type: 'clear-values' });

		dispatch({ type: 'add-dummy', payload: {label: values.collection}});
		axios.post(apiUrl +'/add/card', {
			card: {
				title: values.title,
				description: values.description,
				link: values.link,
				collection: values.collection
			}
		}).then(res => {
			dispatch({type: 'replace-dummy', payload: {
				title: values.title,
				description: values.description,
				link: values.title,
				collection: values.collection,
				id: res.data
			}});
		});
	}

	const getOptions = (): JSX.Element[] => {
		const options: JSX.Element[] = [];
		state.collections.map((collection, index) => {
			options.push(<option key={'o' + index}>{collection}</option>);
		})

		return options;
	}

    return (
		<div>
			<form className='new-form' onSubmit={handleSubmit}>
				<input value={values.title} placeholder='Title' className='new-form-input' onChange={(e) => handleChange({ type: 'change-value', target: 'title', payload: e.target.value })}/>
				<input value={values.description} placeholder='Description' className='new-form-input' onChange={(e) => handleChange({ type: 'change-value', target: 'description', payload: e.target.value })}/>
				<input value={values.link} placeholder='Link' className='new-form-input' onChange={(e) => handleChange({ type: 'change-value', target: 'link', payload: e.target.value })}/>
				<select value={values.collection} className='new-form-select' onChange={(event) => handleChange({ type: 'change-value', target: 'collection', payload: event.target.value })}>
					{getOptions()}
				</select>
				<button>GO</button>
			</form>
		</div>
    );
}
 
export default New