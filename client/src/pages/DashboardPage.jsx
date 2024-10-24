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

    const [activeSection, setActiveSection] = useState('profile');

    useEffect(() => {
        if (location.hash) {
            setActiveSection(location.hash.substring(1));
        }
    }, [location]);

    const sectionComponents = {
        profile: <ProfileComponent />,
        users: userRole === 'admin' && <UsersComponent />,
        services: userRole === 'admin' && <ServicesComponent />,
        contracts: userRole === 'admin' && <ContractsComponent />,
        shifts: userRole === 'admin' && <ShiftsComponent />,
        orders: userRole === 'client' && <OrdersComponent />,
        myservices: userRole === 'employee' && <MyServicesComponent />,
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
                    'profile',
                    'Mi Perfil',
                    activeSection === 'profile' && 'activeSelectedLink'
                )}

                {userRole === 'admin' && (
                    <>
                        {renderNavLink(
                            'users',
                            'Usuarios',
                            activeSection === 'users' && 'activeSelectedLink'
                        )}
                        {renderNavLink(
                            'services',
                            'Servicios',
                            activeSection === 'services' && 'activeSelectedLink'
                        )}
                        {renderNavLink(
                            'contracts',
                            'Contratos',
                            activeSection === 'contracts' &&
                                'activeSelectedLink'
                        )}
                        {renderNavLink(
                            'shifts',
                            'Turnos',
                            activeSection === 'shifts' && 'activeSelectedLink'
                        )}
                    </>
                )}

                {userRole === 'client' &&
                    renderNavLink(
                        'orders',
                        'Pedidos',
                        activeSection === 'orders' && 'activeSelectedLink'
                    )}

                {userRole === 'employee' &&
                    renderNavLink(
                        'myservices',
                        'Servicios',
                        activeSection === 'myservices' && 'activeSelectedLink'
                    )}
            </section>
            {sectionComponents[activeSection]}
        </>
    );
};

export default DashboardPage;
