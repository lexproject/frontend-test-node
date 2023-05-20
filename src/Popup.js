import { useEffect } from 'react';
import { useValidation } from './utils/Validation';


function Popup(props) {
  const { handleChange, values, resetForm, setValues } = useValidation();

  useEffect(() => {
    let { text, image } = props.curentEdit;
    props.curentButton === 'Редактировать' && setValues({ ...values, story: text === '' ? image : text });
  }, [props.curentEdit])

  function submitForm(e) {
    e.preventDefault();
    props.curentButton === 'Регистрация' ?
      props.onSubmitReg(values) : props.curentButton === 'Авторизация' ? props.onSubmitAuth(values) :
        props.curentButton === 'Добавить' ? props.onSubmitPost(values.story) : props.curentButton === 'Редактировать' &&
          props.onUpdatePost(values.story, props.curentEdit._id);
    resetForm();
    props.close();
  }
  return (
    <div className={`popup ${props.open ? 'popup_opened' : ''}`}>
      <div className="popup__form-container">
        <button type="button" className="popup__close" onClick={() => { props.close(); resetForm() }} aria-label="Закрыть">X</button>
        <h2 className="popup__title">{props.curentButton}</h2>
        <form name="popup" onSubmit={submitForm} className="popup__form">
          {props.curentButton.slice(-4) === 'ация' ?
            <> <label className="popup__form-label">
              <input type="text" name="name" className="popup__input" value={values.name} onChange={handleChange} placeholder="Имя" minLength="2" maxLength="40" required />
            </label>
              <label className="popup__form-label">
                <input type="password" name="password" className="popup__input" value={values.password} onChange={handleChange} placeholder="Пароль" minLength="6" maxLength="24" required />
              </label></> :
            <label className="popup__form-label">
              <textarea
                className='popup__textarea popup__input'
                value={values.story}
                onChange={handleChange}
                id="story"
                name="story"
                rows="5"
                cols="33">Frontend-разработчик со стажем</textarea>
            </label>}
          <button type="submit" className="popup__button post-info-text post-button">Отправить</button>
        </form>
      </div>
    </div>
  );
}
export default Popup;