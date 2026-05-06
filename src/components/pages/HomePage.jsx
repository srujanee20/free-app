import InAppLayout from "../layouts/InAppLayout.jsx";
import {Link} from "react-router";

const HomePage = () => {
    return (
        <InAppLayout>
            <h1>Title 1</h1>
            <p>Lorem Ipsum Something Something</p>
            <Link to="/ink-well">Quote Page</Link>
        </InAppLayout>
    );
};

export default HomePage;