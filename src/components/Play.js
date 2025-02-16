
const Play = ({ socket }) => {
    const sendSound = () => {
        socket.emit("sound", "C4");
    }
    return ( 
        <div className="play">
            <button onClick={sendSound}>send sound</button>
        </div>
    );
}
 
export default Play;