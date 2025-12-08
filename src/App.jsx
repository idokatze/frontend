import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/style/app.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'

import { store } from './store/store.js'

export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className="main-layout">
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<ToyIndex />} path="/toy" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}
