import { Link } from "react-router-dom";

const Home = ({ socket }) => {

    return ( 
        <div className="home">
            <h1>ONDES</h1>
            <Link to="/host">Host</Link>
            <Link to="/join">Join</Link>
        </div>
    );
}
 
export default Home;