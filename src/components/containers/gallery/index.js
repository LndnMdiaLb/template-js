import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    animated,
    useSpring
} from "react-spring";

import styled from "styled-components";
import { useDrag } from "react-use-gesture";

const randomHex = () => Math.random().toString(16).substr(-6);

const Title = styled.h1`
    font-family: JosefinSlab; 
    font-size: 6rem;
    margin: 3rem;
    color: #${()=>randomHex()};
`;

const Container = styled.div`
    display:flex;
    flex-direction:column;
    overflow:hidden;
`;

const Panel = styled.article`
    background-color:#${()=>randomHex()};
    width:100vw;
    height:100vh;
    display:flex;
    touch-action:pan-y;
    flex-shrink:0;
`;

const AnimatedPanel = animated(Panel);

function findFrame(node, targetNode){
    if (node.parentNode === targetNode) return node
    return findFrame(node.parentNode, targetNode);
}

const InteractiveGallery = ({children}) => {
    
    const gallery = useRef();
    const xposition = useRef(0);

    const [{x}, api] = useSpring(()=>({x:0}));

    const bind = useDrag(
        ({
            movement:[ dragx ], // (xy - initial) current gesture offset
            
            canceled, cancel, 
            down, 
            event,
        })=> {
            
            event.persist();
            
            const frameTarget =  findFrame(event.target, gallery.current);
            const frameWidth = frameTarget.offsetWidth;

            const viewableWidth = frameWidth * (children.length-1); // allowed scrollable width
            const dragValue = xposition.current+dragx;                
            const threshhold = 250;

            /* trigger automated snap back */
            if (!down) {
                if (Math.abs(dragx)<threshhold){
                    const x = xposition.current;
                    api.start({ x, onChange:({value:{x:xpos}})=>xposition.current=xpos});
                }else{
                    xposition.current+=dragx;
                }
            }

            /* trigger automated reveal */
            else if(Math.abs(dragx)>threshhold){
                const dir = dragx<0 ? -frameWidth : 0;
                const x = dragValue-(dragValue%frameWidth)+dir;
                api.start({ x, onChange:({value:{x:xpos}})=>xposition.current=xpos});
                cancel();
            }
            
            /* bounds */
            else if(dragValue > 0 ) {
                api.start({ x:0, immediate:down });
                xposition.current=0;
                cancel();
            }
            
            else if(dragValue < -viewableWidth ) {
                api.start({ x:-viewableWidth, immediate:down });
                xposition.current=-viewableWidth;
                cancel();
            }
                            
            /* drag */
            else { 
                api.start({ x:dragValue, immediate:down }) 
            };
        }, 
        {
            lockDirection:true,
            useTouch:true,
        }
    ) ;

    const transform = x.to((x)=>`translateX(${x}px)`);
    const transformOpposite = x.to((x)=>`translateX(${-x}px)`);

    return (
        <AnimatedPanel ref={gallery}
            {...bind()} 
            style={{ transform }}>
            { React.Children.map(children, (project, i) => {
                const projectChildren = project.props.children;
                const ContentArray = React.Children.map(projectChildren, content=>{
                    return React.cloneElement(content, { 
                        style:{
                            transform: transformOpposite,
                            position:"relative",
                            left:`-${i*100}vw` 
                        }
                    })
                });
                return React.cloneElement( project, {
                    style:{ overflow:"hidden" } 
                }, ContentArray)
            })}       
        </AnimatedPanel>
    );
};

const Content = ({style}) => {
    return (
        <animated.div {...{style}}>
            <Title>The Quick Brown Fox Jumps Over The Lazy Dog</Title>
            <Title>The Quick Brown Fox Jumps Over The Lazy Dog</Title>
        </animated.div>
    );
}

const Test = ({children})=>{
    // React.Children.count(children)
    /* count children */
    return <div>yoink</div>
}

const Gallery  = () => (
    <Container >
        <InteractiveGallery>
            <Panel>
                <Content/>
            </Panel>
            <Panel>
                <Content/>
            </Panel>
            <Panel>
                <Content/>
            </Panel>      
        </InteractiveGallery>
    </Container> );

export default Gallery;