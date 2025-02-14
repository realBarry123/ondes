import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const Home = ({ socket }) => {

    const navigate = useNavigate();

    const [joinOn, setJoinOn] = useState(false);
    const [codeInput, setCodeInput] = useState("");

    const submitJoin = (code) => {
        socket.emit("join-code", code);
    }

    const toHost = () => {
        navigate("/host", { replace: true });
    }

    const setInputRef = useCallback((node) => {
        if (node) {
          node.focus(); // Focus only when the input is mounted
        }
      }, []);
    
    useEffect(() => {

        // When the join code is verified by the server
        const onJoinSuccess = (id) => {
            if (socket.id === id){
                navigate("/play", { replace: true }); // Go to play
            }
        }
        socket.on("join-success", onJoinSuccess);

        return () => {
            socket.off("join-success", onJoinSuccess);
        }
    }, [socket]);

    return (
        <div className="home">
            <h1>ONDES</h1>
            <h3>Created by Barry Yu</h3>
            <button 
                onClick={toHost} 
                style={{borderRight: "0.5px solid #ffff", width: "120px"}}
            >Create New</button>
            
            <button 
                onClick={() => {setJoinOn(!joinOn)}} 
                style={{borderLeft: "0.5px solid #ffff", width: "120px"}}
            >Join Ensemble</button>

            {joinOn && <div>
                <input 
                    ref={setInputRef}
                    type="text" 
                    value={codeInput}
                    placeholder="Join Code"
                    onChange={(e) => setCodeInput(e.target.value)}
                />
                <button onClick={() => {submitJoin(codeInput)}}>Submit</button>
            </div>}


        </div>
    );
}
 
export default Home;