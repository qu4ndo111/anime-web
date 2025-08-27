import { NavLink } from 'react-router-dom';
import './header.scss'

const Header = () => {

    return (
        <div className='w-full flex justify-center dark:bg-sakura-darkCard'>
            <div className='w-layout flex justify-between items-center'>
                <h1>Anime</h1>
                <div className='flex gap-4'>
                    <NavLink to="/">
                        {({ isActive }) => (
                            <div className={isActive ? 'nav-btn active' : 'nav-btn'}>
                                Home page
                            </div>
                        )}
                    </NavLink>
                    <NavLink to="/genres">
                        {({ isActive }) => (
                            <div className={isActive ? 'nav-btn active' : 'nav-btn'}>
                                Genres
                            </div>
                        )}
                    </NavLink>
                    <NavLink to="/top">
                        {({ isActive }) => (
                            <div className={isActive ? 'nav-btn active' : 'nav-btn'}>
                                Top Anime
                            </div>
                        )}
                    </NavLink>
                </div>
                <div className='flex gap-3'>
                    <i className="pi pi-search" ></i>
                    <i className="pi pi-user"></i>
                </div>
            </div>
        </div>
    )
}


export default Header;