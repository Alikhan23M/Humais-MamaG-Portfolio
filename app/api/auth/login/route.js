import { validateAdminCredentials, generateToken } from '../../../../lib/auth'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    
    if (!validateAdminCredentials(email, password)) {
      return Response.json({ message: 'Invalid credentials' }, { status: 401 })
    }
    
    const token = generateToken({ email, role: 'admin' })
    
    return Response.json({ 
      message: 'Login successful', 
      token,
      user: { email, role: 'admin' }
    })
  } catch (error) {
    return Response.json({ message: 'Login failed' }, { status: 500 })
  }
}