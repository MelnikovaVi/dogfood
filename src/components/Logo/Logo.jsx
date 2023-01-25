import './Style.css';
import logoSvg from './logo.svg'
import { Link } from 'react-router-dom';


const Logo = () => {
	return (
		<Link to={'/'} className='logo__pic' href='/'>
			<img src={logoSvg} alt="Logo DogFood" className='logo__pic'/>
		</Link>
	);
};

export default Logo;