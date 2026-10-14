import { Navigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'

    const AuthGuard = ({ children }) => {
    const { session } = useUserStore()

    if (!session?.token) {
        return <Navigate to="/login" replace />
    }

    return children
}
export default AuthGuard