import React from 'react'

function Button({children}) {
    return (
        <button className={'btn-primary px-8 py-1.5 mt-7'}>{children}</button>
    )
}

export default Button
