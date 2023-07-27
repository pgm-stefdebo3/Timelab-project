import React from 'react'

type ConditionalLoaderProps = {
    condition: boolean,
    children: React.ReactNode,
}

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