import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import './LastNews.css';
import { Height } from '@mui/icons-material';
import { match } from 'assert';
import { motion } from 'framer-motion';

const URL = 'https://vk.com/skoipt_professionalitet';
const TARGET_SIZE_BLOCK_TEXT = 200;
const MIN_SIZE_TEXT = 12;
const MAX_SIZE_TEXT = 40;

export default function LastNews({ fullText = false }) {
  const [images, setImages] = useState(new Array<React.ReactElement>());
  const [text, setText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(response.data, 'text/html');

        const elements: Array<React.ReactElement> = [];
        let newText = '';

        const postTextEl = htmlDoc.querySelector('.wall_post_text');
        const postContentEl = postTextEl?.parentElement;

        postContentEl
          ?.querySelectorAll('div')[1]
          ?.querySelectorAll('img')
          .forEach((element, index) => {
            if (
              element.classList.value.indexOf(
                'PhotoPrimaryAttachment__imageElement',
              ) > -1 ||
              element.classList.value.indexOf('MediaGrid__imageElement') > -1
            )
              elements.push(
                <motion.img
                  className="LastNews__img"
                  src={element.src}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3, duration: 0.5 }}
                />
              );
          });

        newText = postTextEl?.textContent ?? '';

        setText(newText);
        setImages(elements);
        setIsLoaded(true);
      })
      .catch((error) => {
        setText('Не удалось загрузить');
        setIsLoaded(true);
      });
  }, []);

  // Функция для вычисления размера текста в зависимости от длины строки
  const calculateFontSize = (textLength) => {
    const MAX_SIZE = 10;  // Максимальный размер текста
    const MIN_SIZE = 30;  // Минимальный размер текста
    const MAX_LENGTH = 500; // Максимальное количество символов для максимального размера

    if (textLength <= MAX_LENGTH) {
      return MAX_SIZE;
    } else {
      const size = MAX_SIZE - (textLength - MAX_LENGTH) * 0.2; // Уменьшаем размер текста на 0.2px за каждый символ сверх лимита
      return Math.max(size, MIN_SIZE);
    }
  };

  // Оптимизация: Мемоизация текста и анимация по словам
  const animatedText = useMemo(() => {
    const words = text.split(' ');
    const fontSize = calculateFontSize(text.length); // Вычисляем размер текста

    return words.map((word, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03, duration: 0.4 }}
        style={{ fontSize: `${fontSize}px`, display: 'inline-block', marginRight: '5px' }}
      >
        {word}
      </motion.span>
    ));
  }, [text]);

  return (
    <motion.div
      className="LastNews"
      initial={{ opacity: 0, scale: 0, y: 500 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <div className="LastNews__container">
        {!isLoaded ? (
          <CircularProgress />
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'spring', stiffness: 50 }}
            >
              {animatedText}
            </motion.div>

            <div className="LastNews__images">{images}</div>
          </>
        )}
      </div>
    </motion.div>
  );
}
