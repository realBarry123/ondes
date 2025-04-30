import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const Home = ({ socket }) => {

    const navigate = useNavigate();

    const [joinOn, setJoinOn] = useState(false);
    const [codeInput, setCodeInput] = useState("");

    // Submit join code to server
    const submitJoin = (code) => {
        socket.emit("join-code", code);
    }

    // When the user clicks the "create new" button
    const toHost = () => {
        navigate("/host", { replace: true });
    }

    // Focus input bar
    const setInputRef = useCallback((node) => {
        if (node) {
          node.focus();
        }
    }, []);
    
    // On socket change
    useEffect(() => {

        // When the join code is verified by the server
        const onJoinSuccess = ({ id, instrumentName }) => {
            console.log(instrumentName);
            if (socket.id === id){
                navigate("/play", { replace: true, state: { instrumentName: instrumentName }});
            }
        }
        socket.on("join-success", onJoinSuccess);

        return () => {
            socket.off("join-success", onJoinSuccess);
        }
    }, [socket]);

    return (
        <div className="home">
            <h1>Ondes</h1>
            <h2>for networked ensemble</h2>
            <h3>Barry Yu (2025)</h3>

            {!joinOn && <div>
                <button 
                    className="ui-button"
                    onClick={toHost} 
                    style={{borderRight: "0.5px solid #ffff", width: "120px"}}
                >create new</button>
                
                <button 
                    className="ui-button"
                    onClick={() => {setJoinOn(!joinOn)}} 
                    style={{borderLeft: "0.5px solid #ffff", width: "120px"}}
                >join ensemble</button>
            </div>}

            {joinOn && <div>
                <input 
                    ref={setInputRef}
                    type="text" 
                    value={codeInput}
                    placeholder="join code"
                    autoCorrect="off"
                    autoCapitalize="off"
                    onChange={(e) => setCodeInput(e.target.value)}
                />
                <button 
                    className="ui-button"
                    onClick={() => {submitJoin(codeInput)}}
                    style={{marginLeft: "10px"}}
                >submit</button>
            </div>}
            <div className="link-container">
                <Link className="link" to={{pathname: "/program"}}>program note</Link>
            </div>
        </div>
    );
}
 
export default Home;