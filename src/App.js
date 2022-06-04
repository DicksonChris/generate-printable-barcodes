import Home from './components/HomeComponent';
import About from './components/AboutComponent';
import Header from './components/HeaderComponent';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <div className='App'>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
            </Routes>
        </div>
    );
}

export default App;
