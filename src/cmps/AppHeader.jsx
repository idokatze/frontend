import { NavLink } from 'react-router-dom'
import logo from '../assets/img/logo.jpg'

export function AppHeader() {
    return (
        <section>
            <section className='app-header'>
                <img src={logo} className='logo'/>
                <nav>
                    <NavLink to="/"> Home </NavLink>
                    <NavLink to="/toy"> Toys </NavLink>
                    <NavLink to="/about"> About </NavLink>
                </nav>
            </section>
        </section>
    )
}
