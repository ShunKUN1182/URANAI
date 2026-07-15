import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Friend from "./pages/Friend";
import DM from "./pages/DM";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/friend" element={<Friend />} />
                    <Route path="/dm" element={<DM />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
