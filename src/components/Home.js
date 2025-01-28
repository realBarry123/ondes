import { Link } from "react-router-dom";
import { useState } from "react";

const Home = ({ socket }) => {

    const [joinOn, setJoinOn] = useState(false);
    const [codeInput, setCodeInput] = useState("");

    return ( 
        <div className="home">
            <h1>ONDES</h1>
            <Link to="/host">Host</Link>
            <button onClick={() => {setJoinOn(!joinOn)}}>Join</button>
            {joinOn && <input 
                type="text" 
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
            />}
        </div>
    );
}
 
export default Home;