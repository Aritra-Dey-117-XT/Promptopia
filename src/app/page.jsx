"use client"

import "@/styles/globals.css"
import Feed from "@/components/Feed"
import { useState, useEffect } from "react"
import { useSession, signIn, getProviders } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Suspense } from 'react'

function Home() {

  const {data: session} = useSession()
  const [providers, setProviders] = useState(null)
  const tag = useSearchParams().get("tag")
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  useEffect(() => {
    const setProvider = async () => {
        const response = await getProviders()
        setProviders(response)
    }
    setProvider()
  }, [])

  return (
    <Suspense>
      <section className="w-full flex-center flex-col">
          <h1 className="head_text text-center">Discover and Share
              <br className="max-md:hidden"/>
              <span className="orange_gradient text-center"> AI-Powered Prompts</span>
          </h1>
          <p className="desc text-center sm:pb-16">
            <span className="font-bold text-orange-500">Promptopia</span> <span className="text-green-600">is an open-source AI prompting tool for modern world to
            discover, create and share creative prompts</span>
          </p>

          {session?.user.id ? (
            <Feed 
              tag={tag}
            />
          ) : (
            <>
              <h2 className="text-center text-2xl md:text-4xl font-bold leading-tight text-gray-800 my-4 blue_gradient">
                Sign In to Explore the World of Beautiful, Creative, Playful and Professional AI-Prompts from People All Around The Globe.
              </h2>
              <div>
                {providers && Object.values(providers).map((provider) => (
                    <button 
                        type="button" 
                        key={provider.name} 
                        onClick={() => {
                          signIn(provider.id)
                        }}
                        className='orange_gradient_btn'
                    >
                        Join Now &gt;
                    </button>
                  ))}
                </div>          
            </>
          )}

          {isVisible && (
            <div className="fixed bottom-4 right-4 cursor-pointer z-50">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 100 100" 
                width="50" 
                height="50"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-10 lg:h-10"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <circle cx="50" cy="50" r="45" fill="black"/>
                <polyline points="25,60 50,30 75,60" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}

      </section>
    </Suspense>
  )
}

export default Home