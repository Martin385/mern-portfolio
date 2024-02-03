import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
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
    
    if(!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Por favor, llenar todos los campos')

    }
    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch('/api/auth/signup', {
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
        navigate('/sign-in')
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
              Port
            </span>
            Flix
          </Link>
          <p className="text-sm mt-5">
            Este es el portfolio de Martin Mastropietro
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Tu nombre de usuario"></Label>
              <TextInput
                type="text"
                placeholder="Nombre..."
                id="username"
                onChange={handleChange}
              ></TextInput>
            </div>
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
                placeholder="Contra..."
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
                ): 'Registrese'
              }
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Ya estas registrado?</span>
            <Link to="/sign-in" className="text-blue-500">
              Inicia sesion
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
