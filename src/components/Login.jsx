import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import Input from './Input'
import Button from './Button'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState('')

    const login = async(data) => {
        setError('')
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                    navigate('/')
            }
        } catch (error) {
          setError(error.message)  
        }
    }

  return (
    <div className=''>
      <div className=''>
        <span>
          <Logo />
        </span>
      </div>
      <h2 className=''>Sign in to your account</h2>
      <p>
        Don&apos;t have an account?&nbsp;
        <Link
          to='/signup'
          className=''
        >
          Sign up
        </Link>
      </p>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className=''>
        <div className=''>
          <Input 
            lable='Email'
            placeholeder='Enter your email'
            type='email'
            {...register('email', {
              required: true,
              validate:{
                matchPatern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || 'Email address must be a valid address'
              }
            })} //name should be unique
          />
          <Input 
            lable='Password'
            type='password'
            placeholeder='Enter your password'
            {...register('password', {
              required: true
            })}
          />
          <Button>Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default Login