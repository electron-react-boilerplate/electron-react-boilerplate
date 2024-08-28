import { Box, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import './LastNews.css';
import { Height } from '@mui/icons-material';

const url = 'https://vk.com/skoipt_professionalitet';

export default function LastNews({ fullText = false }) {
  const [images, setImages] = useState(new Array<ReactElement>());
  const [text, setText] = useState('Загрузка...');

  axios
    .get(url)
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
            elements.push(<img src={element.src} />);
        });

      newText = postTextEl?.textContent ?? '';

      setText(newText);
      setImages(elements);
    })
    .catch((error) => {
      setText('не удалось загрузить');
    });

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        inset: '0px',
        margin: 'auto',
        width: '1000px',
        height: '800px',
      }}
    >
      <Box sx={{ margin: '15px' }}>
        <Typography variant="h6">{text}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '300px' }}>
          {images}
        </Box>
      </Box>
    </Paper>
  );
}
