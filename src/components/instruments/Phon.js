
const Phon = ({ sendSound }) => {
    return (
        <div className="phon">
            <button 
                className="ui-button"
                onClick={sendSound}
            >send sound</button>
        </div>
    );
}

export default Phon;