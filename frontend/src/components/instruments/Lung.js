
const Lung = ({ sendSound }) => {
    return (
        <div className="lung">
            <button 
                className="ui-button"
                onClick={sendSound}
            >send sound</button>
        </div>
    );
}

export default Lung;