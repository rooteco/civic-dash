import React, {useState, useEffect} from 'react';

export function useWindowSize() {
    
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    
  
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}


export function useParentSize(ref: React.MutableRefObject<null>) {
    const [parentSize, setParentSize] = useState({
      width: undefined,
      height: undefined,
    });

    const windowSize = useWindowSize();

    useEffect(() => {
      if (ref.current) {
        let height = ref.current.parentElement.offsetHeight;
        let width = ref.current.parentElement.offsetWidth;
  
        setParentSize({
          width: width,
          height: height,
        });
      }
      return () => {};
    }, [windowSize]);
    
    return parentSize;
}
