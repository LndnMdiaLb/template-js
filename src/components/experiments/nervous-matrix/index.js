import React, {useCallback, useEffect, useRef, useState} from "react"

import styled from "styled-components"

/*
    EVERY ITERATION

    extend length of selected

    calculate true total length left 
    calculate length of all non selected ( this plus selected is current length )

    ration is (total lentgh left) / (length of all non selected)

    apply ratio to all non selected
*/

const Container = styled.div`
    height:100%;
    width:100%;
`;

const ColoredDiv = styled.div`
    float:left;
    box-sizing:border-box;
    border: 1px solid #fff;
    padding:5px;
    height:100%;
`;

class Tile {
    constructor(width, node){
        this.initWidth = this.width = width / 3;
        this.node = node;
    }
}
    
const NervousMatrix = () => {
    
    const elementsMap = new WeakMap();
    const tiles = [];

    const firstRender= useRef(true);
    const currentTile = useRef();

    function matrix(currentTile) {

        let selected;  
        let selectedTileWidth=0;
        let size=window.innerWidth/2;
        let prevxScale;  
        
        const length = window.innerWidth;
        
        if(currentTile.current){
            
            /* currentTile collected from mouseOver */
            selected = currentTile.current;       
            prevxScale = selected.width;  
            selectedTileWidth = selected.width += ( size - prevxScale ) / 2; 
        } 
        
        /*
            calculate current total width of all elements
        */
        let adjustedWidthTotal = 0 ;
        for (let tile in tiles) adjustedWidthTotal += tiles[tile].width ;
    
        /*
            the length of the matrix minus - square thats being altered 
            (because all the squares will start readjusting this is not constant)
        */
        let adjustedWidthTotalDiff = adjustedWidthTotal - selectedTileWidth ;
    
        /* 
            the 'true' length of the matrix minus the square thats being altered 
            ( this is constant it reprasents how much space the rest of the squares should take up 
            so that the overal matrix size doesnt change 
        */
        let trueWidthTotalDiff = length - selectedTileWidth ; 
    
        let ratio = ( trueWidthTotalDiff / adjustedWidthTotalDiff ) ;
    
        for (let tile in tiles){ 
            if (tiles[tile] != selected) tiles[tile].width = tiles[tile].width * ratio ;
            const element = tiles[tile].node ;
            element.style.setProperty('width', `${tiles[tile].width}px`) ;
        }; 
    
    };

    useEffect(()=>{
        firstRender.current=false ;
        function run(){
            matrix(currentTile);
            window.requestAnimationFrame(run) ;
        }
        run();
    },[]);
    
    const storeWidth = useCallback((node)=>{
        if(!firstRender.current) return
        const tile = new Tile( window.innerWidth, node );
        tiles.push(tile);
        elementsMap.set(node, tile);
    }, []);

    const setElement = ({target})=>{ 
        currentTile.current = elementsMap.get(target)
    };

    return (
        <Container>
            {[...'...'].map((el, i)=> <ColoredDiv color={i} ref={storeWidth} onMouseEnter={setElement}/>)}
        </Container>
    );
}

export default NervousMatrix