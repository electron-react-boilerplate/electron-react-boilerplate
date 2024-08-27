import axios from 'axios';
import { useEffect, useState } from 'react';

const url = 'https://pogoda.mail.ru/prognoz/salavat/';


export default function Weather({interval = 1000*60*60, }: any) 
{
	const [curTemp, setCurTemp] = useState('0');

	
	function UpdateTemp(): void 
	{
		axios.get(url)
			.then((response) => {
			const parser = new DOMParser();
				const htmlDoc = parser.parseFromString(response.data, 'text/html');
				const temp = htmlDoc.querySelector('.information__content__temperature')?.textContent ?? '0';

				setCurTemp(temp);
			})
			.catch((error) => {
				setCurTemp("~");
			});
	}

	useEffect(() => {
		setInterval(UpdateTemp, interval);

		return () => clearInterval(Number(UpdateTemp));
	}, []);

	
	UpdateTemp();

	return (
		<div>
			{curTemp}
		</div>
	)
}