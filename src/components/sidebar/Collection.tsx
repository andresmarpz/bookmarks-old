import React from 'react';
import { useContext } from 'react';
import { Store } from '../../management/Store';
 
const Collection = (props: { label: string }) => {

	const {state, dispatch} = useContext(Store);

    return (
		<button style={{ color: (state.collection.label === props.label ? 'white' : 'grey') }} className='collection' onClick={() => dispatch({ type: 'change-collection', payload: { label: props.label} })}>
			{props.label}
		</button>
    );
}
 
export default Collection