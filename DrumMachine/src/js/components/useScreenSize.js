/** 
 * Custom React Hook which returns screen size for dynamic responsice layout 
 * link: https://stackoverflow.com/questions/39435395/reactjs-how-to-determine-if-the-application-is-being-viewed-on-mobile-or-deskto
 * */
import {useEffect, useState} from "react";

const useScreenSize = () => {
    const [screen, setScreen] = useState({width: window.innerWidth, height: window.innnerHeight});
    
    const handleWindowSizeChange = () => {
        setScreen({width: window.innerWidth, height: window.innerHeight});
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return screen;
}

export default useScreenSize;