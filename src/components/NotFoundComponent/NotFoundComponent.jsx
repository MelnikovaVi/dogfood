import './Styles.css'
import errorPic from './notFoundPic.png'
import { Link } from 'react-router-dom'


const NotFoundComponent = ({
	children, title, buttonText, buttonActtion
}) => {
	return (
			<div className='errorContainer'>
				
				{buttonActtion ?
				<a href='#' className='btnBack' onClick={buttonActtion}>{buttonText}</a> :
				<Link to="/" className='btnBack'>{buttonText}</Link>}
				
				<h1 className='title'>{title}</h1>
				{children && children}
				<img src={errorPic} alt="Error 404 picture" className='errorImg'/>
			</div>
	);
};

export default NotFoundComponent;