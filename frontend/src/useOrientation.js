import { useState, useEffect } from 'react'

const getOrientation = () => window.screen.orientation.type;

const useOrientation = () => {
    const [orientation, setOrientation] = useState(getOrientation());

    const updateOrientation = () => {
        setOrientation(getOrientation());
    }

    useEffect(() => {
    	window.addEventListener('orientationchange', updateOrientation);

    	return () => {
    		window.removeEventListener('orientationchange', updateOrientation);
    	}
    }, [])
    
    return (orientation == "landscape-primary" || orientation == "landscape-secondary")?
    "landscape":"portrait";
}

export default useOrientation;