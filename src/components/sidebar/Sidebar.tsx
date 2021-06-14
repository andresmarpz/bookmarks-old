import React from 'react';
import { useContext } from 'react';
import { Store } from '../../management/Store';
import SVG from 'react-inlinesvg'; 
import CollectionList from './CollectionList';
import NewCollection from './NewCollection';

const Sidebar = () => {

	const {state, dispatch, appState} = useContext(Store);

	return (
		<div className={'sidebar'}>
			<div className='sidebar-container'>
				<div className='sidebar-collections'>
					<NewCollection />
					<CollectionList />
				</div>
			</div>
		</div>
	);
}
 
export default Sidebar 