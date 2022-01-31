export const userQuery = (userId) => {
  const query = `*[_type == 'user' && _id == '${userId}']`;
  return query;
};

export const postQuery = (postId) => {
  const query = `*[_type == 'post' && _id == '${postId}'] | order(_createdAt){ 
    _id,
    title,
    about,
    image{
      alt,
      "image": image{
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
    },
    save[]{
      _key,
      author->{
        _id,
        username,
        image
      },
      userId
    },
    comment[]{
      _key,
      author->{
        _id,
        username,
        image
      },
      comment
    },
    likes[]{
      _key,
      user->{
        _id,
        username,
        image
      },
      comment
    }
   }`;
  return query;
};

export const getPostsQuery = (pageSize) => {
  const query = `*[_type == 'post'] | order(_createdAt desc){ 
    _id,
    title,
    about,
    image{
      alt,
      "image": image{
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
    },
    save[]{
      _key,
      author->{
        _id,
        username,
        image
      },
      userId
    },
    userId
   }[0...${pageSize}]`;
  return query;
};

export const getMorePostsQuery = (post, size) => {
  const query = `*[_type == "post" && category == '${post.category}' && _id != '${post._id}']{ 
    _id,
    title,
    about,
    image{
      alt,
      "image": image{
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
    },
    save[]{
      _key,
      author->{
        _id,
        username,
        image
      },
      userId
    },
    userId
   }`;
  return query;
};

export const getPostsByCategory = (category) => {
  const query = `*[_type == "post" && category == '${category}']{ 
    _id,
    title,
    about,
    image{
      alt,
      "image": image{
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
    },
    save[]{
      _key,
      author->{
        _id,
        username,
        image
      },
      userId
    },
    userId,
    likes
   }`;
  return query;
};

export const searchQuery = (term) => {
  const query = `*[_type == 'post' && title match '${term}*' || category match '${term}*' || about match '${term}*']{
    _id,
    title,
    about,
    image{
      alt,
      "image": image{
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
    },
    save[]{
      _key,
      author->{
        _id,
        username,
        image
      },
      userId
    }
   }`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[_type == 'post' && userId == '${userId}'] | order(_createdAt desc){ 
    _id,
    title,
    about,
    image{
      alt,
      "image": image{
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
    },
    save[]{
      _key,
      author->{
        _id,
        username,
        image
      },
      userId
    },
    userId
   }`;
  return query;
}

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'post' && '${userId}' in save[].userId] | order(_createdAt desc){ 
    _id,
    title,
    about,
    image{
      alt,
      "image": image{
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
    },
    save[]{
      _key,
      author->{
        _id,
        username,
        image
      },
      userId
    },
    userId
   }`;
  return query;
}
