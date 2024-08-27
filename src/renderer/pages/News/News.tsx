import React, { useEffect, useState } from 'react';
import axios from 'axios';

function News() {
  const [content, setContent] = useState('<p>Загрузка...</p>');
  useEffect(() => {
    const url = 'https://vk.com/skoipt_professionalitet';
    axios.get(url)
    .then((response) => {
      const parser = new DOMParser();
        const doc = parser.parseFromString(response.data, 'text/html');
        const postContent = doc.querySelector('.wall_post_text');
        if (postContent) {
          setContent(postContent.outerHTML);
        } else {
          setContent('<p>Контент не найден</p>');
        }
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
        setContent('<p>Ошибка загрузки данных</p>');
      });
  }, []);
  return (
    <div>
      {/* Используем dangerouslySetInnerHTML для вставки HTML */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default News;
