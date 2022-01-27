export const userQuery = (userId) => {
  const query = `*[_type == 'user' && _id == '${userId}']`;
  return query;
};

export const getPostsQuery = (pageSize) => {
  const query = `*[_type == 'post'] | order(_createdAt desc){ 
    _id,
    title,
    image{
      alt,
      image{
        asset->{
          url
        }
      }
    },
    destination,
    category,
    author->{
      _id,
      username,
      image
    }
   }[0...${pageSize}]`;
   return query;
};
