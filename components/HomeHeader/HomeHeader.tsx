import React from 'react'

const HomeHeader = () => {
  return (
    <section className="flex flex-col justify-center flex-wrap content-center mt-6">
      <h1 className="max-w-lg xl mt-12 text-4xl md:text-6xl font-bold bg-gradient-to-r from-stone-300 via-violet-600 to-indigo-400 inline-block text-transparent bg-clip-text p-2 text-center m-auto">
        HTTP request code generator
      </h1>
      <h2 className="mt-6 text-2xl font-semibold text-center">
        Build an HTTP for any language
      </h2>
    </section>
  )
}

export default HomeHeader
