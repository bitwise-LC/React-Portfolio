import { useEffect, useState, useMemo } from "react";

function useTypewriter(text, speed, delay = 0) {

    const [index, setIndex] = useState(0);

    const displayText = useMemo(
        () => text.slice(0, index),
        [text, index]
    );

    useEffect(() => {
        setIndex(0);
        const delayId = setTimeout(() => {

            const timeoutId = setInterval(() => {

                setIndex(i => {

                    if (i >= text.length) {
                        clearInterval(timeoutId);
                        return i;
                    }

                    return i + 1;
                });

            }, speed);

        }, delay);


        return () => {
            clearTimeout(delayId);
        };

    }, [text, speed, delay]);


    return displayText;
}

export default useTypewriter;