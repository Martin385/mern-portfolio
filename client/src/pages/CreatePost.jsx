import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Crear un post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Titulo requerido' required id='title' className='flex-1'></TextInput>
          <Select>
            <option value="uncategorized">Elige una categoria</option>
            <option value="terror">Terror</option>
            <option value="comedy">Comedia</option>
            <option value="drama">Drama</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file' accept='image/*'></FileInput>
          <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Agregar Imagen</Button>
        </div>
        <ReactQuill theme='snow' placeholder='Escribir algo...' className='h-72 mb-12' required></ReactQuill>
        <Button type='submit' gradientDuoTone='purpleToPink'>Publicar</Button>
      </form>
    </div>
  )
}
