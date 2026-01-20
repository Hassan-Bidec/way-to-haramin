"use client"
import PackageComponent from '../../dashboard/components/PackageComponent'
import { useParams } from 'next/navigation'

import React from 'react'
import { ToastContainer } from 'react-toastify'

const page = () => {
  const {slug} = useParams()
  console.log("Slug in package details page:", slug);
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