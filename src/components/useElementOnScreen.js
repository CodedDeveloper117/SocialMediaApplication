import { useEffect, useRef, useState } from "react"

const useElementOnScreen = (options) => {
    const itemRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    const callbackFunction = (entries) => {
        const [ entry ] = entries
        setIsVisible(entry.isIntersecting)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options)
        if(itemRef?.current) observer.observe(itemRef.current)
        return () => {
            if(itemRef?.current) observer.unobserve(itemRef.current)
        };
    }, [itemRef, options])

    return [itemRef, isVisible]
}

export default useElementOnScreen