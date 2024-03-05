import { useEffect, useState } from "react";

const useScrollTrigger = (scrollDistance = 20) => {
    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > scrollDistance) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollDistance]);

    return scrolled;
}

export default useScrollTrigger;
