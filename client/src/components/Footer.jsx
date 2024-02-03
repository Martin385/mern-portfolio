import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter, BsYoutube} from 'react-icons/bs'
export default function FooterComponent() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Port
              </span>
              Flix
            </Link>
          </div>
          <div className="grid gris-cols-2 gap-8  mt-4 sm:grid-cols-3 sm:gap-6">
                <div>
                <Footer.Title title="Acerca de" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                100 JS Projects
              </Footer.Link>
              <Footer.Link
                href="/about"
                target="_blank"
                rel="noopener noreferrer"
              >
                Port flix
              </Footer.Link>
            </Footer.LinkGroup>
                </div>
                <div>
                <Footer.Title title="Seguinos" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="https://www.github.com/Martin385"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </Footer.Link>
              <Footer.Link
                href="/about"
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin
              </Footer.Link>
            </Footer.LinkGroup>
                </div>
                <div>
                <Footer.Title title="Legal" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="#"
              >
                Politicas de Privacidad
              </Footer.Link>
              <Footer.Link
                href="#"
              >
                Terminos y Condiciones
              </Footer.Link>
            </Footer.LinkGroup>
                </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href="#" by="Martin Mastropietro" year={new Date().getFullYear()}/>

            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <Footer.Icon href="#" icon={BsFacebook}/>
                <Footer.Icon href="#" icon={BsTwitter}/>
                <Footer.Icon href="#" icon={BsInstagram}/>
                <Footer.Icon href="#" icon={BsYoutube}/>
                <Footer.Icon href="#" icon={BsLinkedin}/>
                <Footer.Icon href="#" icon={BsGithub}/>
            </div>
        </div>
      </div>
    </Footer>
  );
}
