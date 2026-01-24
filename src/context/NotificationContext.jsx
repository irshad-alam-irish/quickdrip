import { createContext, useContext, useState, useCallback } from 'react';
import Snackbar from '../components/Snackbar';

const NotificationContext = createContext();

export function useNotification() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((message, type = 'info') => {
        setNotification({ message, type });
    }, []);

    const hideNotification = useCallback(() => {
        setNotification(null);
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification, hideNotification }}>
            {children}
            {notification && (
                <Snackbar
                    message={notification.message}
                    type={notification.type}
                    onClose={hideNotification}
                />
            )}
        </NotificationContext.Provider>
    );
}
