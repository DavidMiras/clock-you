import { useState, useEffect, useContext } from 'react';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useUser from '../hooks/useUser';
import AvatarComponent from '../components/AvatarComponent';
import ProfileComponent from '../components/ProfileComponent';
import UsersComponent from '../components/AdminDashboard/Users/UsersComponent';
import ServicesComponent from '../components/AdminDashboard/Services/ServicesComponent';
import ContractsComponent from '../components/AdminDashboard/Contracts/ContractsComponent';
import ShiftsComponent from '../components/AdminDashboard/Shifts/ShiftsComponent';
import MyServicesComponent from '../components/EmployeeDashBoard/MyServicesComponent';
import OrdersComponent from '../components/ClientDashboard/OrdersComponent';

const DashboardPage = () => {
    const { authToken } = useContext(AuthContext);
    const { user } = useUser();

    const location = useLocation();

    const userRole = user?.role;

    const [activeSection, setActiveSection] = useState('ProfileComponent');

    useEffect(() => {
        if (location.hash) {
            setActiveSection(location.hash.substring(1));
        }
    }, [location]);

    const sectionComponents = {
        ProfileComponent: <ProfileComponent />,
        UsersComponent: userRole === 'admin' && <UsersComponent />,
        ServicesComponent: userRole === 'admin' && <ServicesComponent />,
        ContractsComponent: userRole === 'admin' && <ContractsComponent />,
        ShiftsComponent: userRole === 'admin' && <ShiftsComponent />,
        OrdersComponent: userRole === 'client' && <OrdersComponent />,
        MyServicesComponent: userRole === 'employee' && <MyServicesComponent />,
    };

    const renderNavLink = (section, label, extraClass = '') => (
        <NavLink className={extraClass} to={`#${section}`}>
            {label}
        </NavLink>
    );

    if (!authToken && !user) return <Navigate to='/' />;

    return (
        <>
            <AvatarComponent />
            <section className='manager-tabs'>
                {renderNavLink(
                    'ProfileComponent',
                    'Mi Perfil',
                    activeSection === 'ProfileComponent' && 'activeSelectedLink'
                )}
                {userRole === 'admin' && (
                    <>
                        {renderNavLink(
                            'UsersComponent',
                            'Usuarios',
                            activeSection === 'UsersComponent' &&
                                'activeSelectedLink'
                        )}
                        {renderNavLink(
                            'ServicesComponent',
                            'Servicios',
                            activeSection === 'ServicesComponent' &&
                                'activeSelectedLink'
                        )}
                        {renderNavLink(
                            'ContractsComponent',
                            'Contratos',
                            activeSection === 'ContractsComponent' &&
                                'activeSelectedLink'
                        )}
                        {renderNavLink(
                            'ShiftsComponent',
                            'Turnos',
                            activeSection === 'ShiftsComponent' &&
                                'activeSelectedLink'
                        )}
                    </>
                )}
                {userRole === 'client' &&
                    renderNavLink(
                        'OrdersComponent',
                        'Pedidos',
                        activeSection === 'OrdersComponent' &&
                            'activeSelectedLink'
                    )}
                {userRole === 'employee' &&
                    renderNavLink(
                        'MyServicesComponent',
                        'Servicios',
                        activeSection === 'MyServicesComponent' &&
                            'activeSelectedLink'
                    )}
            </section>
            {sectionComponents[activeSection]}
        </>
    );
};

export default DashboardPage;
