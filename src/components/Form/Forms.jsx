import './Styles.css'

export function Forms ({title, handeleFormSubmit, children}) {
    return (
        <form onSubmit={handeleFormSubmit}>
            <h1 className='title'>{title}</h1>
            {children}
        </form>
    )
}