import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";

const InAppLayout = ({ children }) => {

    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    );
};

export default InAppLayout;