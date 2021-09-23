import React, { Children } from 'react'

function H2({children,className}) {
    return (
        <h2 className={'font-bold text-3xl title capitalize text-center' + ' ' +className}>{children}</h2>
    )
}

export default H2
