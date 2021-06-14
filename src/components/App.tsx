import { useContext } from 'react';
import { Store, appStates } from '../management/Store';
import Container from './container/Container';
import Navbar from './navbar/Navbar';
import LoadingScreen from './LoadingScreen';
import Footer from './footer/Footer';
import Sidebar from './sidebar/Sidebar';
import Separator from './global/Separator';
import New from './footer/New';

const App = () => {

    const { state, dispatch, appState } = useContext(Store);

    return (
        <div className='app'>
            { state.sidebar && state.authenticated && <Sidebar />}
            { state.sidebar && state.authenticated && <Separator vertical={true} />}
            <div className='main'>
                <Navbar />
                <Separator vertical={false} />
                <Container />
                { appState === appStates.LOADING && <LoadingScreen /> }
            </div>
        </div>
    );
}
 
export default App