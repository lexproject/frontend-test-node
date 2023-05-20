import Post from './Post';
import { memo } from 'react';

const PostList = memo((props) => {

  
  return (
      <ul className='movies-card-list'>
        {props.posts.map(item =>
          <Post
            key={item._id}
            isLogged={props.isLogged}
            post={item}
            userId={props.userId}
            onDeleteClick = {props.onDeleteClick} 
            onEditClick ={props.onEditClick}
          />
        )}
      </ul>
  );
})

export default PostList;