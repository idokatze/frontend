import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { LoginSignup } from './LoginSignup.jsx'
import logo from '../assets/img/logo.jpg'

export function AppHeader() {
    const user = useSelector((storeState) => storeState.userModule.loggedInUser)

    function onLogout() {
        try {
            logout()
            showSuccessMsg('Bye Bye')
        } catch (error) {
            showErrorMsg('OOPs try again')
        }
    }
    return (
        <section>
            <section className="app-header">
                <img src={logo} className="logo" />
                <nav>
                    <NavLink to="/"> Home </NavLink>
                    <NavLink to="/toy"> Toys </NavLink>
                    <NavLink to="/about"> About </NavLink>
                </nav>
            </section>
            {user ? (
                <section>
                    <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                    <button onClick={onLogout}>Logout</button>
                </section>
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
        </section>
    )
}
