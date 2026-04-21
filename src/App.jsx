import { Routes, Route } from "react-router-dom"
import Navbar from "./component/Navbar"
import BattlePage from "./pages/BattlePage"
import CollectionPage from "./pages/CollectionPage"
import AboutPage from "./pages/AboutPage"
import Footer from "./component/Footer"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BattlePage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App