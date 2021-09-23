import React from 'react'
import styled from 'styled-components'

const StyledHero=styled.header`
display:flex;
align-items:center;
justify-content:center;
min-height:60vh;
background:url(${props=> props.imgUrl}) center/cover no-repeat;
`;

export default StyledHero
