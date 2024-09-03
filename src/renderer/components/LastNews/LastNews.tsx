import { Box, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import './LastNews.css';
import { Height } from '@mui/icons-material';
import { match } from 'assert';

const URL = 'https://vk.com/skoipt_professionalitet';
const TARGET_SIZE_BLOCK_TEXT = 200;
const MIN_SIZE_TEXT = 12;
const MAX_SIZE_TEXT = 40;

export default function LastNews({ fullText = false }) {
  const [images, setImages] = useState(new Array<ReactElement>());
  const [textEl, setTextEl] = useState(<div>Загрузка...</div>);

  axios
    .get(URL)
    .then((response) => {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(response.data, 'text/html');

      const elements: Array<ReactElement> = [];
      let newText = '';

      /*
       * number post
       *
       * htmlDoc.querySelectorAll(".wall_post_text")[number]
       */
      const postTextEl = htmlDoc.querySelector('.wall_post_text');
      const postContentEl = postTextEl?.parentElement;

      postContentEl
        ?.querySelectorAll('div')[1]
        ?.querySelectorAll('img')
        .forEach((element) => {
          if (
            element.classList.value.indexOf(
              'PhotoPrimaryAttachment__imageElement',
            ) > -1 ||
            element.classList.value.indexOf('MediaGrid__imageElement') > -1
          )
            elements.push(<img className='LastNews__img' src={element.src} />);
        });

      newText = postTextEl?.textContent ?? '';
      
      let size = TARGET_SIZE_BLOCK_TEXT * 60 / newText.length
      if (size < MIN_SIZE_TEXT) size = MIN_SIZE_TEXT;
      else if (size > MAX_SIZE_TEXT) size = MAX_SIZE_TEXT;
      
      setTextEl(<div style={{fontSize: size}}>{newText}</div>);
      setImages(elements);
    })
    .catch((error) => {
      setTextEl(<div>не удалось загрузить</div>);
    });
    
  return (
    <div className='LastNews'>
        <div className='LastNews__container'>
            {textEl}

            <div className='LastNews__images'>
                {images}
            </div>
        </div>
    </div>
  );
}
