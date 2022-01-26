import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { searchQuery, feedQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
  const { categoryId } = useParams;
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState()
  console.log("llo")

  useEffect(() => {
    /* if(categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query)
        .then(data => setPins(data))
        .catch(e => console.log(e))
        //setLoading(false)
    } else {
      client.fetch(feedQuery)
        .then(data => setPins(data))
        .catch(e => console.log(e))
    } */
  }, [categoryId])

  if(loading) return <Spinner message="We are adding new ideas to your feed" />
  return <div>
  <MasonryLayout />
  </div>;
};

export default Feed;
