import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Playlist from './pages/playlist/Playlist';
import Login from './pages/login/Login';
import Singup from './pages/singup/Singup';

const App = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/singup' element={<Singup/>}/>
                <Route path='/playlist/:id' element={<Playlist/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
