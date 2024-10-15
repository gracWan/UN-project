import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./LoginSignup";


const RoutesList = () => {
    return (
        <BrowserRouter>
            {/* <Navbar /> */}
            <Routes>
                {/* <Route exact path="/" element={<Home />} /> */}
                <Route exact path="/login-signup" element={<LoginSignup />} />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesList;