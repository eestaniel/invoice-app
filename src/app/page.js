"use client"
import {useRouter, redirect} from "next/navigation";
import {loginWithGoogle} from "@/app/components/googleAuthService";
import {useAuth} from "@/app/dashboard/context/AuthContext";
import {useEffect} from "react";

export default function Home() {
  const router = useRouter()
  const {auth, currentUser} = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await loginWithGoogle(auth)
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(currentUser?.uid) {
      redirect('/dashboard')
    }
  }, [currentUser])

  return (
    <main className="flex flex-col w-full min-h-screen bg-11-light justify-center ">
      {/* button to dashboard */}
      <div className="flex flex-col w-full justify-center">
        <div className="signin__container mx-auto mt-10 p-8 bg-white shadow-md rounded-lg max-w-md">
          <h1 className="signin__title text-2xl font-bold mb-4 text-center">Welcome to the InvoiceApp</h1>
          <p className="signin__description text-sm text-gray-600 text-center mb-6">Sign in to manage your invoices
            efficiently</p>
          <div className="signin__button-container">
            <button
              className="signin__google-button bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
              onClick={(e) => handleLogin(e)}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>


    </main>
  )
}

