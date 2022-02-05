import { NavLink } from 'react-router-dom';
import s from './categories.module.scss';
import cn from 'classnames';

const Categories = ({ productSections, onSectionChanged, currentSection }) => {
    
    const setCurrentCaption = (section) => {
        if(currentSection === section) {
            return <h1 className={cn(s.caption, s.active)} onClick={() => { onSectionChanged(section) }}>{section}</h1>
        }
        else return <h1 className={s.caption} onClick={() => { onSectionChanged(section) }}>{section}</h1>
    }

    return <>
            <div className={s.categories}>
                <NavLink to="/">{ setCurrentCaption(productSections[0]) }</NavLink>
                <NavLink to="/location">{ setCurrentCaption(productSections[1]) }</NavLink>
            </div>       
    </>
}

export default Categories;