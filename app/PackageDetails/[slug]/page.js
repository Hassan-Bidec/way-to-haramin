"use client"
import PackageComponent from '@/app/dashboard/components/PackageComponent'
import { useParams } from 'next/navigation'

import React from 'react'
import { ToastContainer } from 'react-toastify'

const page = () => {
  const {slug} = useParams()
  return (
    <>
 <PackageComponent packageSlug={slug} />
 <ToastContainer
         position="top-right"
         autoClose={3000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
       />
       </>
  )
}

export default page