import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = ({ socket }) => {

    const navigate = useNavigate();

    const [joinOn, setJoinOn] = useState(false);
    const [codeInput, setCodeInput] = useState("");

    const submitJoin = (code) => {
        socket.emit("join-code", code);
    }
    
    useEffect(() => {
        socket.on("join-success", () => {
            navigate("/play");
        })
    }, [socket]);

    return (
        <div className="home">
            <h1>ONDES</h1>
            <Link to="/host">Host</Link>
            <button onClick={() => {setJoinOn(!joinOn)}}>Join</button>

            {joinOn && <div>
                <input 
                    type="text" 
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                />
                <button onClick={() => {submitJoin(codeInput)}}>Submit</button>
            </div>}


        </div>
    );
}
 
export default Home;