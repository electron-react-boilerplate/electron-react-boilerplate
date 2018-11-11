import loremIpsum from 'lorem-ipsum';
import uuidv4 from 'uuid/v4';

import loremPicsum from '../lorem-picsum';
import { Module } from './types';

/**
 * Browses some fake-ass galleries
 */
export default class LorumIpsumModule extends Module {
  constructor() {
    super();

    this.maxSearchPages = 3;
    this.maxGalleriesPages = 5;
    this.maxGalleryPages = 1;
  }

  async searchGalleriesAsync(searchQuery, pageNumber = 1) {
    const items = [...Array(20)].map(() => {
      const width = 50 * Math.floor(Math.random() * 19) + 100;
      const height = 50 * Math.floor(Math.random() * 19) + 100;
      return {
        image: loremPicsum({ width, height }),
        id: uuidv4(),
        thumb: `https://via.placeholder.com/${width}x${height}`,
        title: loremIpsum(),
        hasChildren: true,
      };
    });

    return {
      items,
      hasNextPage: pageNumber <= this.maxSearchPages,
    };
  }

  async getGalleryAsync(pageNumber) {
    const items = [...Array(20)].map(() => {
      const width = 50 * Math.floor(Math.random() * 19) + 100;
      const height = 50 * Math.floor(Math.random() * 19) + 100;
      return {
        image: loremPicsum({ width, height }),
        id: uuidv4(),
        thumb: `https://via.placeholder.com/${width}x${height}`,
        title: loremIpsum(),
        hasChildren: false,
      };
    });

    return {
      items,
      hasNextPage: pageNumber <= this.maxGalleryPages,
    };
  }

  async getGalleriesAsync(pageNumber = 1) {
    const items = [...Array(20)].map(() => {
      const width = 50 * Math.floor(Math.random() * 19) + 100;
      const height = 50 * Math.floor(Math.random() * 19) + 100;
      return {
        image: loremPicsum({ width, height }),
        id: uuidv4(),
        thumb: `https://via.placeholder.com/${width}x${height}`,
        title: loremIpsum(),
        hasChildren: true,
      };
    });

    return {
      items,
      hasNextPage: pageNumber <= this.maxGalleriesPages,
    };
  }
}
