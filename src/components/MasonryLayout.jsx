import React from 'react';
import Masonry from 'react-masonry-css'
import Pin from './Pin'

const breakPoints = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 4,
  1000: 4,
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
