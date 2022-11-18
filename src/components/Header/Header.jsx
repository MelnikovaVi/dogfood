import "./Style.css";

export default function Header({children}) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          {children}
        </div>
      </div>
    </header>
  );
}
