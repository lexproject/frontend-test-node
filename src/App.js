import logo from './logo.svg';
import './App.css';
import PostList from './PostList';
import { mainApi } from './utils/MainApi';
import Popup from './Popup';
import { useState, useCallback, useEffect } from 'react';

function App() {

  const [posts, setPosts] = useState([]);
  const [currentPg, setCurrentPg] = useState(0);
  const [page, setPage] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [button, setButton] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [isEdit, setIsEdit] = useState({});
  const linkValid = new RegExp(/^https?:\/\/[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);

  const countPost = () => {
    mainApi.getCount()
      .then(res => pagination(res.data))
      .catch(console.log)
  }

  const isPage = (e) => {
    let pageNum = e.target.textContent === '1' ? 0 : e.target.textContent;
    setCurrentPg(pageNum);
    getPosts();
  }

  const getPosts = useCallback(() => {
    mainApi.getPosts(currentPg * 10)
      .then(res => setPosts(res.data))
      .catch(err => {
        console.log(err)
        err.message.includes('Ошибка 401') && onSignOut();
      });
  }, [currentPg])

  useEffect(() => { getPosts() }, [getPosts]);
  function openPopup(e) {
    setIsPopup(true);
    console.log(e.target.textContent)
    setButton(e.target.textContent)
  }
  function closePopup() {
    setIsPopup(false);
  }

  const onSignIn = useCallback(() => {
    mainApi.getUser()
      .then((user) => {
        if (user) {
          setIsLogged(true);
          setCurrentUser(user.data);
        }
      })
      .catch(err => {
        err.message.includes('Ошибка 401') && onSignOut();
        console.log(err.message);
      })
  }, []);

  useEffect(() => { onSignIn() }, [onSignIn]);
  useEffect(() => { countPost() }, [posts]);

  function onLogin(dataInput) {
    const { password, name } = dataInput;
    if (!name || !password) { return }
    mainApi.signin(password, name)
      .then((userData) => {
        if (userData) {
          onSignIn();
        }
      })
      .catch(console.log);
  }

  function onRegister(dataAuth) {
    const { password, name } = dataAuth;
    if (!name || !password) { return }
    mainApi.signup(password, name)
      .then((userData) => {
        if (userData) {
          onLogin({ name, password })
        }
      })
      .catch(console.log);
  }

  function onSignOut() {
    mainApi.getOut()
      .then((res) => {
        console.log(res);
        setIsLogged(false);
      })
      .catch(console.log);
  }

  function onPost(text) {
    let isMedia = linkValid.test(text.trim());
    let post = isMedia ? { image: text } : { text }
    console.log(post, 'post');
    mainApi.setNewPost(post).then((postSaved) => {
      const newMovie = postSaved.data; console.log(newMovie);
      getPosts();
    })
      .catch(console.log)
  }

  function onEdit(e, id) {
    mainApi.getPostById(id)
      .then(post => setIsEdit(post))
      .catch(err => console.log(err));
    openPopup(e);
  }

  function onUpdate(text, id) {
    let isMedia = linkValid.test(text.trim());
    let post = isMedia ? 'image' : 'text';
    mainApi.updatePost({ id, [post]: text }).then((postSaved) => {
      const newPost = postSaved.data; console.log(newPost);
      getPosts();
    })
      .catch(err => {
        console.log(err);
      })
  }

  function onDelete(id) {
    mainApi.deletePost(id)
      .then(res => {
        console.log(res);
        getPosts();
      })
      .catch(err => console.log(err));
  }

  function pagination(count) {
    let pg = Math.floor(count / 10)
    const numbers = []
    for (let i = 1; i <= pg; ++i) {
      numbers.push(i)
    }
    setPage(numbers)
  }
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className='header-title'>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <div className='admin-block'>
            {!isLogged ?
              <>
                <button
                  type='button'
                  className='post-info-text post-button'
                  onClick={openPopup}
                >Авторизация</button>
                <button
                  type='button'
                  className='post-info-text post-button'
                  onClick={openPopup}
                >Регистрация</button>
              </> :
              <>
                <span className='admin__user post-info-text'>{`Привет: ${currentUser.name}`}</span>
                <button
                  type='button'
                  className='post-info-text post-button'
                  onClick={openPopup}
                >Добавить</button>
                <button
                  type='button'
                  className='post-info-text post-button'
                  onClick={onSignOut}
                >Выход</button>
              </>}
          </div>
        </header>
        <section className='posts'>
          <PostList
            posts={posts}
            isLogged={isLogged}
            userId={currentUser._id}
            onEditClick={onEdit}
            onDeleteClick={onDelete}
          />
        </section>
        <ul className='pagination'>
          {page.map(item =>
            <button
              key={item}
              type='button'
              className='post-info-text post-button'
              onClick={isPage}
            >{item}</button>
          )}
        </ul>
        <footer className='footer'>
          <p className='footer-text'>NODEAPPBLOG 2023</p>
        </footer>
      </div>
      <Popup
        close={closePopup}
        open={isPopup}
        onSubmitReg={onRegister}
        onSubmitAuth={onLogin}
        onSubmitPost={onPost}
        onUpdatePost={onUpdate}
        curentButton={button}
        curentEdit={isEdit} />
    </>
  );
}

export default App;
