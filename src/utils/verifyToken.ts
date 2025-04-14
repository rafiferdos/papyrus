// import { jwtDecode } from "jwt-decode";

// export const verifyToken = (token: string) => {
//   return jwtDecode(token);
// };


import { jwtDecode } from 'jwt-decode'
import { TUser } from '@/types/auth.types'

interface JwtPayload {
  userId: string
  role: string
  iat: number
  exp: number
}

export const verifyToken = (token: string): TUser => {
  try {
    // Decode the JWT token
    const decodedToken = jwtDecode<JwtPayload>(token)

    // From your login response, we can see the JWT payload contains 'userId', not '_id'
    // Create a user object based on the token payload
    const user: TUser = {
      _id: decodedToken.userId, // Map userId from token to _id in user object
      userId: decodedToken.userId, // Also set it as userId for compatibility
      name: '', // These fields don't exist in token but are required by TUser
      email: '',
      password: '',
      role: decodedToken.role as 'user' | 'admin',
      isActive: true,
    }

    return user
  } catch (error) {
    console.error('Token verification failed:', error)
    throw new Error('Invalid token')
  }
}