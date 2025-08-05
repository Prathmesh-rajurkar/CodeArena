import Footer from '@/components/Footer'
import ProfilePage from '@/components/ProfilePage'
import React from 'react'

function page() {
  return (
    <div className="bg-black text-white min-h-screen z-50">
      <div className="pt-[80px] z-50">
        <ProfilePage />
      </div>
      <Footer/>
    </div>
  )
}

export default page