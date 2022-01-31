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

export const getPostsQuery = (from, to) => {
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
  }[${from}...${to}]`;
  return query;
};

export const getMorePostsQuery = (post, from, to) => {
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
   }[${from}...${to}]`;
  return query;
};

export const getPostsByCategory = (category, from, to) => {
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
   }[${from}...${to}]`;
  return query;
};

export const searchQuery = (term, from, to) => {
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
   }[${from}...${to}]`;
  return query;
};

export const userCreatedPinsQuery = (userId, from, to) => {
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
   }[${from}...${to}]`;
  return query;
}

export const userSavedPinsQuery = (userId, from, to) => {
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
   }[${from}...${to}]`;
  return query;
}
