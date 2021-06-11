import React from 'react';
import { useContext } from 'react';
import { apiUrl } from '../../helper/Constants';
import { Store } from '../../management/Store';
 
const UserMenu = () => {

	const {state, dispatch} = useContext(Store);

    return (
		<div className='user-menu'>
			<div>Logged in as</div>
			<div>{state.user.username}</div>
			<hr />
			<button className='user-menu-btn' onClick={() => window.open(apiUrl +'/logout', '_self')}>Logout</button>
		</div>
    );
}
 
export default UserMenu 