import styled, {createGlobalStyle, css, keyframes} from 'styled-components'

import React from 'react'

// Gooey effect from: https://css-tricks.com/gooey-effect/
// https://codepen.io/lbebber/pen/LELBEo

const radius= 50 ;
const time= 7 ;


const BGcolor= createGlobalStyle`
    body {
        background-color: black;
    }
` ;


const bar= (n, left, top, width, height, bg= false)=> css`
    &:nth-child(${n}) {
        left: ${left}%;
        top: ${top}%;
        width: ${width *1.15}rem;
        height: ${height}rem;
        ${ bg || `background: ${bg};` }
    }` ;


const grow = keyframes`
  from {
    transform:  scale(0);
  }
  to {
    transform:  scale(2);
  }
` ;


const color = keyframes`
	0% { color: #cfff94; }
	50% { color: #ace9ff; }
	100% { color: #ff9494; }
` ;


const SVGContainer= styled.div`
	width: 30rem;
	height: 100vh;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	overflow: hidden;
	filter:url("#goo");
` ;


const Circle= styled.div`

	position: absolute; top: 50%; left: 50%;
	transform: translate(-50%, -50%);
	width: 20rem;
	height: 20rem;
	border-radius: ${radius}%;
	border: 0.5rem solid;
	animation: ${color} ${time}s infinite alternate;

	&::before,
	&::after {
		content: '';
		position: absolute; top: 50%; left: 50%;
		transform: translate(-50%, -50%) rotate(45deg);
		width: 50%;
		height: 50%;
		border-radius: ${radius}%;
		border: 0.3rem solid;
		z-index: -1;
		pointer-events: none;
	}

	&::before {
		animation: ${grow} ${time}s infinite ${-time}s alternate;
	}

	&::after {
		animation: ${grow} ${time}s infinite ${-time*2}s alternate;
	}
` ;


const Bar= styled.div`

	position: absolute;
	border-radius: 1rem;

	${ bar(1, 0, 0, 0.5, 10, `linear-gradient(#f7ff94, #ffacac)`)}
	${ bar(2, 5, 10, 0.3, 5, `linear-gradient(#ff9494, #ace9ff)`)}
	${ bar(3, 10, 40, 0.5, 13, `linear-gradient(#33c9ff, #cfff94)`)}
	${ bar(4, 20, 50, 0.5, 7, `linear-gradient(#ace9ff, #ff9494)`)}
	${ bar(5, 50, 5, 0.5, 5, `linear-gradient(#cfff94, #33c9ff)`)}
	${ bar(6, 53, 80, 0.5, 10, `linear-gradient(#ace9ff, #ff9494)`)}
	${ bar(7, 75, 45, 0.5, 5, `linear-gradient(#f7ff94, #ffacac)`)}
	${ bar(8, 85, -25, 0.5, 12, `linear-gradient(#33c9ff, #cfff94)`)}
	${ bar(9, 75, 80, 0.5, 5, `linear-gradient(#f7ff94, #ffacac)`)}
	${ bar(10, 95, 25, 0.3, 10, `linear-gradient(#cfff94, #33c9ff)`)}

    /* horizontal bars */

	${ bar(11, 35, 25, 10, 0.3, `linear-gradient(to right, #cfff94, #33c9ff)`)}
	${ bar(12, -20, 65, 15, 0.5, `linear-gradient(to right, #33c9ff, #cfff94)`)}
	${ bar(13, 35, 45, 10, 0.4, `linear-gradient(to right, #ace9ff, #ff9494)`)}
	${ bar(14, 35, 55, 5, 0.5, `linear-gradient(to right, #ff9494, #ace9ff)`)}
	${ bar(15, 15, 15, 10, 0.5, `linear-gradient(to right, #f7ff94, #ffacac)`)}
	${ bar(16, 20, 50, 5, 0.3, `linear-gradient(to right, #ff9494, #ace9ff)`)}
	${ bar(17, 10, 90, 5, 0.5, `linear-gradient(to right, #f7ff94, #ffacac)`)}
	${ bar(18, 15, 35, 5, 0.5, `linear-gradient(to right, #f7ff94, #ffacac)`)}

	${ bar(19, 60, 30, 0.3, 15, `linear-gradient(#cfff94, #33c9ff)`)}
	${ bar(20, 75, 75, 0.3, 5, `linear-gradient(#33c9ff, #cfff94)`)}
` ;


export const FilterEffect=_=>
    <>
        <BGcolor />
        <SVGContainer>
            <Circle> { Array.from({length:20}).map(_=><Bar />) } </Circle>
        </SVGContainer>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
				<filter id="goo">
					<feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
					<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
					<feComposite in="SourceGraphic" in2="goo" operator="atop"/>
				</filter>
            </defs>
        </svg>
    </> ;
