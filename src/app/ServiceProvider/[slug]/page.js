"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import ServicesProvider from "../../dashboard/ServicesComponent/ServicesProvider";
import VendorDetail from '../../dashboard/ServicesComponent/ServicesProvider';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VendorPage() {
  const { slug } = useParams();

  return (
<>
    <VendorDetail vendorId={slug} />
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
