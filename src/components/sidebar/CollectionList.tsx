import React from 'react';
import { useContext } from 'react';
import { Store } from '../../management/Store';
import Collection from './Collection'; 

const CollectionList = () => {

	const {state, dispatch} = useContext(Store);

	const getElements = (): JSX.Element[] => {
		const elements: JSX.Element[] = [];

		const collections = state.collections;
		collections.map((collection, index) => {
			elements.push(<Collection key={'c' +index} label={String(collection)} />);
		});

		return elements;
	}

    return (
		<div className='collection-list'>
			{getElements()}
		</div>
    );
}
 
export default CollectionList