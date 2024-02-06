import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">
            Acerca de Port Flix
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Port flix funciona como portofolio de Martín Mastropietro en donde
              desarrolla una aplicación web centrada en series y películas donde
              la gente puede subir su reseña de una pelicula en específico
            </p>
            <p>Toda la aplicación esta desarrollada usando el stack de MERN (Mongo - Express - React - Node). Está hecha además ayudandose de otras herramientas como Tailwind, Flowbite, Mongoose, entre otras...</p>
            <p>Cualquier sugerencia o feedback será completamente aceptada. ¡Espero que la disfruten!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
