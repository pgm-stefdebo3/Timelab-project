import React from 'react'

type ConditionalLoaderProps = {
    condition: boolean,
    children: React.ReactNode,
}

export const ConditionalLoader = (props: ConditionalLoaderProps) => {
    if (props.condition) {
        return (
            <>{props.children}</>
        )
    } 
    return (
        <></>
    )
}