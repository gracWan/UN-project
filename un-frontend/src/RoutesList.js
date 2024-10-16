import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./LoginSignup";
import Navigation from "./Navigation";

const RoutesList = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                {/* <Route exact path="/" element={<Home />} /> */}
                <Route exact path="/login-signup" element={<LoginSignup />} />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesList;