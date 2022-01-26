export const userQuery = (userId) => {
  const query = `*[_type == 'user' && _id == '${userId}']`;
  return query;
};

export const searchQuery = (categoryId) => {
  const query = `*[_type == "pin" && title match '${categoryId}' || category match '${categoryId}' || about match ${categoryId}']{
      image {
          asset -> {
              url
          }
      },
      _id,
      destination,
      postedBy -> {
        _id,
        username,
        image
      },
      save[] {
          _key,
          postedBy -> {
            _id,
            username,
            image
          }, 
      },
  }`;

  return query;
};

export const feedQuery = `*[_type == 'pin' ] | order(_createdAt desc){
    image {
        asset -> {
            url
        }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      username,
      image
    },
    save[] {
        _key,
        postedBy -> {
          _id,
          username,
          image
        }, 
    },
}`