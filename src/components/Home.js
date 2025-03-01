import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import ToneTest from "./ToneTest";

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

    // Focus input bar
    const setInputRef = useCallback((node) => {
        if (node) {
          node.focus();
        }
      }, []);
    
    useEffect(() => {

        // When the join code is verified by the server
        const onJoinSuccess = ({ id, instrument }) => {
            console.log(instrument);
            if (socket.id === id){
                navigate("/play", { replace: true, state: { instrument: instrument }});
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
            <h3>created by Barry Yu</h3>

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
                    onChange={(e) => setCodeInput(e.target.value)}
                />
                <button 
                    className="ui-button"
                    onClick={() => {submitJoin(codeInput)}}
                    style={{marginLeft: "10px"}}
                >submit</button>
            </div>}
            <ToneTest />
        </div>
    );
}
 
export default Home;