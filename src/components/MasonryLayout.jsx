import React from 'react';
import Masonry from 'react-masonry-css'
import Pin from './Pin'

const breakPoints = {
  default: 4,
  3000: 5,
  2000: 4,
  1200: 3,
  1000: 3,
  500: 1
}

const MasonryLayout = ({ pins }) => {
  return <Masonry className="flex animate-slide-fwd mt-1" breakpointCols={breakPoints}>
    {
      [...Array(10).keys()].map(index => (
        <Pin id={index} key={index} lastItem={index === 10} />
      ))
    }
  </Masonry>;
};

export default MasonryLayout;
