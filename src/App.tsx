import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Friend from "./pages/Friend";
import DM from "./pages/DM";
import Profile from "./pages/Profile";
import Uranai from "./pages/Uranai";
import Collection from "./pages/Collection";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/uranai" element={<Uranai />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/friend" element={<Friend />} />
                    <Route path="/dm" element={<DM />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
