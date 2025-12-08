import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/style/app.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

// import { AppHeader } from './cmps/AppHeader.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'
// import { HomePage } from './pages/HomePage.jsx'
// import { AboutUs } from './pages/AboutUs.jsx'
// import { CarIndex } from './pages/CarIndex.jsx'
import { store } from './store/store.js'
// import { CarEdit } from './pages/CarEdit.jsx'
// import { CarDetails } from './pages/CarDetails.jsx'
// import { UserDetails } from './pages/UserDetails.jsx'

export default function App() {
    return (
        <Provider store={store}>

        </Provider>
    )
}
