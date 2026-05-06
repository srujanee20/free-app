import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import { Outlet } from "react-router-dom";

const InAppLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header/>
            <Outlet />
            <Footer/>
        </div>
    );
};

export default InAppLayout;