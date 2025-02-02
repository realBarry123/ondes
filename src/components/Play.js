
const Play = ({ socket }) => {
    const sendSound = () => {
        socket.emit("sound", "C4");
    }
    return ( 
        <div className="play">
            <button onClick={sendSound}>Send Sound</button>
        </div>
    );
}
 
export default Play;