import React from 'react'; 

const Card = (props) => {
	if (props) {
	return (
		<div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
		<img alt="" src={props.image} width="200" height="200" />
		<h3>{props.name}</h3>
		</div>
		);
	}
}

export default Card;