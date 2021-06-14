import React from 'react';
 
const Separator = (props: { vertical: boolean, className?: string }) => {
    
	return !props.vertical ? (<div className={'separator-h'} />) : (<div className={'separator-v'} />);
}
 
export default Separator