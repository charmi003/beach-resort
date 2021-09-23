import React from 'react'


const Hero=({heroName,children})=> {
    let styles;
    if(heroName=='homeHero')
    {
        styles={
            backgroundImage:'url(/images/defaultBcg.jpeg)',
            backgroundSize:'cover',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center',
            height:'88vh'
        }
    }
    else
    {
        styles={
            backgroundImage:'url(/images/room-2.jpeg)',
            backgroundSize:'cover',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center',
            height:'60vh'
        }
    }

    return (
        <header className='homeHero' style={styles} className='flex items-center justify-center'>
            {children}
        </header>
    )
}

export default Hero


Hero.defaultProps={
    heroName:'homeHero'
}