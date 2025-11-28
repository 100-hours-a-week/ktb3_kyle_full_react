import styled from "styled-components";
import { useEffect, useRef } from "react";

const ObserverBox = styled.div`
    height: 1px;
`

export const Observer = ({ getNextItems }) => {
    const trigger = useRef(null);
    const fetch = getNextItems();

    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) fetch();
    });

    useEffect(() => {
        observer.observe(trigger.current);
        return () => {
            observer.disconnect();
        }
    }, []);

    return (
        <ObserverBox ref={trigger}/>
    )
}