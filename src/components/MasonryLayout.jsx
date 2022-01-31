import React from 'react';
import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css'
import Pin from './Pin'
import useElementOnScreen from './useElementOnScreen';

const breakPoints = {
  default: 4,
  1200: 4,
  1024: 3,
  768: 2,
  480: 1
}

const MasonryLayout = ({ posts, refresh, getMorePosts = () => {} }) => {

  const [lastItemRef, isVisible] = useElementOnScreen({ 
    threshold: 0.9
   })
  const [lastItemID, setLastItemID] = useState("")

  useEffect(() => {
    if(isVisible) {
      setLastItemID(lastItemRef?.current?.getAttribute("id"))
      const lastPost = posts[posts.length - 1]
      if(lastItemID !== lastPost._id){
        getMorePosts()
      }
    }
    
  }, [isVisible])

  return <Masonry className="flex animate-slide-fwd mt-1" breakpointCols={breakPoints}>
    {
      posts.map((post, index) => (
        <Pin post={post} key={post._id} itemRef={index === (posts.length - 1) ? lastItemRef : null} lastItem={index === (posts.size - 1)} refresh={refresh}/>
      ))
    }
  </Masonry>;
};

export default MasonryLayout;
