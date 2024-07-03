import { useEffect } from "react";


export default function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>, callback: () => void) {
    useEffect(() => {
        function handleClickOutside(ev: MouseEvent) {
            if (ref.current && ev.target instanceof Element && !ref.current.contains(ev.target)) {
                callback();
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, callback]);
}