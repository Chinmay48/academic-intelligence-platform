import React from 'react'
import useAuth from '../../hooks/useAuth'
import logo from "../../assets/logos/edupilot_logo_transparent.png"
function Navbar() {
  const {user}=useAuth();
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">

            <div>

                <h1 className="text-xl font-semibold text-slate-700">

                    <img src={logo}/>

                </h1>

            </div>

            <div className="flex items-center gap-3">

                <div className="text-right">

                    <p className="font-medium">

                        {user?.name}

                    </p>

                    <p className="text-sm text-gray-500">

                        {user?.role}

                    </p>

                </div>

                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">

                    {user?.name?.charAt(0)}

                </div>

            </div>

        </header>

  )
}

export default Navbar
