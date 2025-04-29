import useOrientation from "../useOrientation";

const OrientAlert = ({ targetOrientation }) => {

    const orientation = useOrientation();
    
    return (
        <div className="orient-alert">
            {
                orientation !== targetOrientation && 
                targetOrientation === "landscape" && 
                <div className="fullscreen-message">꜋</div>
            }
            {
                orientation !== targetOrientation && 
                targetOrientation === "portrait" &&
                <div className="fullscreen-message">꜉</div>
            }
        </div>
    );
}
 
export default OrientAlert;