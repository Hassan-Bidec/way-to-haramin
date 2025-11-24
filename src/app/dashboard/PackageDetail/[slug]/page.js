import { Divide, Package } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react'
import PackageDetail from '../../components/PackageDetail';

const page = () => {
const { slug } = useParams(); 

  return (
    <div>
        hello
    </div>
  )
//   <PackageDetail vendorId={slug} />;
}

export default page