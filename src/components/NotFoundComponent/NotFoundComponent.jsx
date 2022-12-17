import m from './Styles.modules.css'
import errorPic from './notFoundPic.png'
import { Link } from 'react-router-dom'


const NotFoundComponent = ({
	children, title, buttonText, buttonActtion
}) => {
	return (
			<div className={m.errorContainer}>
				<img src={errorPic} alt="Error 404 picture" className='m.errorImg'/>
				<h1 className={m.title}>{title}</h1>
				{children && children}
				{buttonActtion ?
				<a href='#' className='btn' onClick={buttonActtion}>{buttonText}</a> :
				<Link to="/" className='btn'>{buttonText}</Link>}
			</div>
	);
};

export default NotFoundComponent;