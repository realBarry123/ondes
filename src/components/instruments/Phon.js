
const Phon = ({ sendSound }) => {
    return (
        <div className="phon">
            <button 
                onClick={sendSound}
            >send sound</button>
        </div>
    );
}

export default Phon;