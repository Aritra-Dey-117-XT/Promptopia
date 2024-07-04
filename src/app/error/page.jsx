"use client"

import Link from "next/link"
import Image from "next/image"

function FourHundredError() {
  
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="mt-2 text-blue-800">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Go back To Home Page
      </Link>
      <Link href="/profile" className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Go To Your Profile
      </Link>
    </section>
  )
}

export default FourHundredError