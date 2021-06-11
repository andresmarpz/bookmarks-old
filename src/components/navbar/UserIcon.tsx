import { useContext } from 'react';
import { Store } from '../../management/Store';
const UserIcon = () => {

	const {state, dispatch} = useContext(Store);

    return (
		<div className='user-icon' onClick={() => dispatch({type: 'toggle-menu'})}>
			<img width='32px' height='32px' style={{ borderRadius: '99px' }} src={`https://avatars.githubusercontent.com/u/${state.user.id}?v=4`} />
			<span className='dropdown-btn'></span>
		</div>
    );
}
 
export default UserIcon