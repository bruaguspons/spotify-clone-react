import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Playlist from './pages/playlist/Playlist';
import Login from './pages/login/Login';
import Singup from './pages/singup/Singup';
import Logout from './pages/logout/Logout';

const App = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/singup' element={<Singup/>}/>
                <Route path='/playlist/:id' element={<Playlist/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
