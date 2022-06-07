import Home from "./components/HomeComponent"
import About from "./components/AboutComponent"
import Header from "./components/HeaderComponent"
import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import Loading from "./components/Loading"
import "./App.css"
import { BarcodeProvider } from "./components/BarcodeContext"

function App() {
    const [loading, setLoading] = useState(false)

    return (
        <div className='App'>
            <BarcodeProvider>
                <Loading loading={loading} />
                <Header />
                <Routes>
                    <Route path='/' element={<Home setLoading={setLoading} />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            </BarcodeProvider>
        </div>
    )
}

export default App
