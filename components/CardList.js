import React from 'react';
import Card from './Card';

const CardList = ({ people, image }) => {
	const cardComponent = people.map((ppl, i) => {
		return <Card key={i} name={people[i].name} image={image[i]} />
	});
	return (
		<div>
		{cardComponent}
		</div>
		);
}

export default CardList;