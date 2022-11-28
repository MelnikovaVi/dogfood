import "./Style.css";

export default function Header({children, user, onUpdateUser}) {

  const handleClickEdit = (e) => {
    e.preventDefault();
    onUpdateUser({name: 'Валерия', about: 'Писатель'})
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          {children}
          {/* изменение состояния родителя через дочерние компоненты производятся через колбеки */}
          <div className="userInfo">
            <span className="info">Пользователь</span>
            {user?.name && <span className="name">{user?.name}</span>}
            {user?.email && <span className="email">{user?.email}</span>}
            <button className="btnEdit" onClick={handleClickEdit}>Редактировать</button>
          </div>
        </div>
      </div>
    </header>
  )
}
