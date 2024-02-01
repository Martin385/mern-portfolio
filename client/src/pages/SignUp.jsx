import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import {Link} from 'react-router-dom'
export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
        <Link to="/" className='font-bold dark:text-white text-4xl'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Mastros</span>
        Blog
      </Link>
      <p className='text-sm mt-5'>
        Este es el portfolio de Martin Mastropietro
      </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>

            <div>
              <Label value="Tu nombre de usuario"></Label>
              <TextInput type='text' placeholder='Nombre...' id='username'></TextInput>
            </div>
            <div>
              <Label value="Tu email"></Label>
              <TextInput type='text' placeholder='name@company.com' id='email'></TextInput>
            </div>
            <div>
              <Label value="Tu contra"></Label>
              <TextInput type='text' placeholder='Contra...' id='password'></TextInput>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>Registrate</Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Ya estas registrado?</span>
            <Link to='/sign-in' className='text-blue-500'>Inicia sesion</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
