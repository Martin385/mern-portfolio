import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col'> 
            <h2 className='text-2xl'>¿Queres saber más de Martin Mastropietro?</h2>
            <p className='text-gray-500 my-2'>Encontrá más en Linkedin</p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://www.linkedin.com/in/martin-mastropietro/" target='_blank' rel='noopener noreferrer'>  Ver más</a>
              
            </Button>
        </div>

        <div className='p-7 flex-1'>
            <img src="https://kinsta.com/es/wp-content/uploads/sites/8/2019/01/estadisticas-linkedin.png" />
        </div>
    </div>
  )
}
