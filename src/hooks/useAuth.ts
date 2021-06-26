import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth () { //complatilhar os dados que usa esse hook
    const value = useContext(AuthContext)

    return value;
    
}