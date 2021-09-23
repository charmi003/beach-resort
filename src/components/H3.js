import React from 'react'

function H3({children,className}) {
    return (
        <h3 className={'text-lg font-bold my-4' +' '+ className}>{children}</h3>
    )
}

export default H3
