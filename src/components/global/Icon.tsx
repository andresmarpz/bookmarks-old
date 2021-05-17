import React, { CSSProperties } from 'react';
 
const Icon = (props: { size: string, color: string, fill?: string, path: string }) => {

    const style: CSSProperties = {
        fill: props.color
    };

    return (
        <svg style={style} className='icon' xmlns='http://www.w3.org/2000/svg' width={props.size} height={props.size} viewBox={`0 0 ${props.size} ${props.size}`} 
            fill={props.fill === undefined ? '' : props.fill}>
                <path d={props.path}></path>
        </svg>
    );
}
 
export default Icon