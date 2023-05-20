import { useEffect, useState } from 'react';

function Post({ post, isLogged, userId, onDeleteClick, onEditClick }) {
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    isLogged && post.owner._id === userId && setIsOwner(true);
  }, [])

  function handleDeletePost() {
    onDeleteClick(post._id);
  }
  function handleEditPost(e) {
    onEditClick(e,post._id);
  }

  const inactive = '_disable'
  return (
    <li className='post'>
      <div className='post-info-box'>
        <span className='post-info-text post-autor'>{post.owner.name}</span>
        <span className='post-info-text post-date'>{post.createdAt.slice(0, -14)}</span>
      </div>
      {post.text === '' ? <img className='post-image' alt='default' src={post.image} />
        : <p className='post-text'>{post.text}
        </p>}
      <div className={`post-info-box post-info-box${!isOwner && inactive}`}>
        <button
          type='button'
          className='post-info-text post-button'
          onClick={handleEditPost}
          disabled={!isOwner}
        >Редактировать</button>
        <button
          type='button'
          className='post-info-text post-button'
          onClick={handleDeletePost}
          disabled={!isOwner}
        >Удалить</button>
      </div>
    </li>
  );
}

export default Post;