import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  
  const [formData, setFormData] = useState({});
  const [errorMessag, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if( !formData.email || !formData.password) {
      return setErrorMessage('Por favor, llenar todos los campos')

    }
    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json()
      if (data.success === false) {
        return setErrorMessage(data.message)
      }
      setLoading(false)
      if(res.ok) {
        navigate('/')
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)

    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Mastros
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Este es el portfolio de Martin Mastropietro
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
           
            <div>
              <Label value="Tu email"></Label>
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="Tu contra"></Label>
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
              ></TextInput>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm'></Spinner>
                  <span className="pl-3">Cargando...</span>
                  </>
                ): 'Inicia Sesion'
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>No tienes una cuenta?</span>
            <Link to="/sign-up" className="text-blue-500">
              Registrate
            </Link>
          </div>

          {
            errorMessag && (
              errorMessag && (
                <Alert className="mt-5" color='failure'>
                  {errorMessag}
                </Alert>
              )
            )
          }
        </div>
      </div>
    </div>
  );
}
