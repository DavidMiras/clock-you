import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import ListServicesComponent from './ListServicesComponent.jsx';
import RegisterServicesComponent from './RegisterServicesComponent.jsx';

const ServicesComponent = () => {
    const [activeSection, setActiveSection] = useState('ListServicesComponent');

    const handleChange = (section, e) => {
        e.preventDefault();
        setActiveSection(section);
    };

    const sectionComponents = {
        ListServicesComponent: <ListServicesComponent />,
        RegisterServicesComponent: <RegisterServicesComponent />,
    };

    return (
        <>
            <div className='manager-tabs'>
                <NavLink
                    className={
                        activeSection === 'ListServicesComponent' &&
                        'activeSelectedLink'
                    }
                    onClick={(e) => {
                        handleChange('ListServicesComponent', e);
                    }}
                >
                    Ver Todos
                </NavLink>
                <NavLink
                    className={
                        activeSection === 'RegisterServicesComponent' &&
                        'activeSelectedLink'
                    }
                    onClick={(e) => {
                        handleChange('RegisterServicesComponent', e);
                    }}
                >
                    Registrar
                </NavLink>
            </div>
            {sectionComponents[activeSection]}
        </>
    );
};

export default ServicesComponent;
