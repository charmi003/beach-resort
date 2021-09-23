import React from 'react'

function H1({children,className}) {
    return (
        <h1 className={'font-bold text-3xl lg:text-5xl title capitalize' + ' '+className}>{children}</h1>
    )
}

export default H1
