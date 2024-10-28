import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./LoginSignup";
import Navigation from "./Navigation";
import NotFound from "./NotFound";
<<<<<<< Updated upstream
import AddCenter from "./AddCenter";

=======
import Map from "./Map";
import AddCenter from "./AddCenter";
>>>>>>> Stashed changes

const RoutesList = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route exact path="/add-center" element={<AddCenter />} />
                <Route exact path="/login-signup" element={<LoginSignup />} />
                <Route exact path="/add-center" element={<AddCenter />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesList;