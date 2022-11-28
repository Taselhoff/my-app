import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Otdel} from './Otdel';
import {Project} from './Project';
import {Sotrudniki} from './Sotrudniki';
import {Fizics} from './Fizics';
import {Podrazdelenie} from './Podrazdelenie';
import {Loadhours} from './Loadhours';
import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';

function App() { 
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className='d-flex justify-content-center m-3'>
        React JS Frontend
      </h3>
      <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
        <ul className='navbar-nav'>
          <li className='nav-item- m-1'>
            <NavLink className='btn btn-light btn-outline-primary' to='/home'>
              Начало
            </NavLink>
          </li>
          <li className='nav-item- m-1'>
            <NavLink className='btn btn-light btn-outline-primary' to='/project'>
              Проекты
            </NavLink>
          </li>
          <li className='nav-item- m-1'>
            <NavLink className='btn btn-light btn-outline-primary' to='/podrazdelenie'>
              Подразделения
            </NavLink>
          </li>
          <li className='nav-item- m-1'>
            <NavLink className='btn btn-light btn-outline-primary' to='/otdel'>
              Отделы
            </NavLink>
          </li>
          <li className='nav-item- m-1'>
            <NavLink className='btn btn-light btn-outline-primary' to='/sotrudniki'>
              Сотрудники
            </NavLink>
          </li>
          <li className='nav-item- m-1'>
            <NavLink className='btn btn-light btn-outline-primary' to='/fizics'>
            Fizics
            </NavLink>
          </li>
          <li className='nav-item- m-1'>
            <NavLink className='btn btn-light btn-outline-primary' to='/loadhours'>
              Отчет
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/podrazdelenie' element={<Podrazdelenie/>}/>
        <Route path='/project' element={<Project/>}/>
        <Route path='/otdel' element={<Otdel/>}/>
        <Route path='/sotrudniki' element={<Sotrudniki/>}/>
        <Route path='/fizics' element={<Fizics/>}/>
        <Route path='/loadhours' element={<Loadhours/>}/>
      </Routes>



    </div>
    </BrowserRouter>
  );
}

export default App;
