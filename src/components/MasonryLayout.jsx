import React from 'react';
import Masonry from 'react-masonry-css'
import Pin from './Pin'

const breakPoints = {
  default: 4,
  1200: 3,
  1024: 2,
  768: 2,
  480: 1
}

const MasonryLayout = ({ posts }) => {
  return <Masonry className="flex animate-slide-fwd mt-1" breakpointCols={breakPoints}>
    {
      posts.map((post, index) => (
        <Pin post={post} key={post._id} lastItem={index === (posts.size - 1)} />
      ))
    }
  </Masonry>;
};

export default MasonryLayout;
