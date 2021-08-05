import React, {useEffect} from 'react'
import styled, {css} from 'styled-components'

const grid1 = css`
    display:grid;
    grid-template: [first-row] repeat(${({$size})=>$size}, 1fr [row]) / [first-col] repeat(${({$size})=>$size}, 1fr [col]);
`;

function RandomChildColor(n) {
    const empty = Array.from({length:n});
    const templateString = empty.reduce((prev, datum, i, arr)=>{
        const hex = `#${Math.random().toString(16).substr(-6)}`;
        const template = css`
            *:nth-child(${i+1}) {
                background-color: ${hex};
            } 
            ${prev}`;
        return template
     },'');
     return templateString
}


export const StyledGallery = styled.div`
    width:500px;
    height:500px;
    margin:auto;
    ${grid1}
    ${({$childCount})=>RandomChildColor($childCount)};
`;

export const ImageGallery = ({children, ...rest})=> {
    const n = React.Children.count(children);
    return (
        <StyledGallery $childCount={n} {...rest}>
            {children}
        </StyledGallery>
    )
} ;