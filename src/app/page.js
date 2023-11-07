"use client"
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex flex-row w-full min-h-screen bg-11-light justify-center">
      {/* button to dashboard */}
      <div>
        <button className="text-white bg-blue-500 button1 p-2"
                onClick={() => router.push('/dashboard')}
        >
          Dashboard
        </button>
      </div>


    </main>
  )
}
