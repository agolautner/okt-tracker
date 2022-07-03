import React, {useEffect} from 'react'
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/auth';

const Protected = ({children}) => {
    const {token, user} = useAuth();
    const location = useLocation();

  return (
    <React.Fragment>
      {!token ? <Navigate to={'/'}/> : (!user.userId && location.pathname !== '/register') ? <Navigate to={'/register'}/> : (children)}
    </React.Fragment>
  )
}

export default Protected