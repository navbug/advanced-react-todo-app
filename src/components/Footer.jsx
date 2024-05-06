import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <p className="text-white text-sm">
            &copy; {new Date().getFullYear()} Advanced To-Do App
          </p>
        </div>
      </footer>
  )
}

export default Footer