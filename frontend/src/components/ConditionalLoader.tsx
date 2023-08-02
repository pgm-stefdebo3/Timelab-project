import React from 'react'
import { ConditionalLoaderProps } from '../interfaces';

const ConditionalLoader = (props: ConditionalLoaderProps) => {
    if (props.condition) {
        return (
            <>{props.children}</>
        )
    } 
    return (
        <></>
    )
}

export default ConditionalLoader;