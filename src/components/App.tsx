import { useContext } from 'react';
import { Store, appStates } from '../management/Store';
import Container from './container/Container';
import Navbar from './navbar/Navbar';
import LoadingScreen from './LoadingScreen';
import Footer from './footer/Footer';

const App = () => {

    const { state, dispatch, appState } = useContext(Store);

    return (
        <div className='app'>
            <div>
                { state.authenticated && <Footer />}
                <Navbar />
                <Container />
                { appState == appStates.LOADING && <LoadingScreen /> }
            </div>
        </div>
    );
}
 
export default App