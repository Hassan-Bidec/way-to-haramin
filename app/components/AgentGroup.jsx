// "use client";
// import React from "react";
// import Image from "next/image";

// const AgentGroup = () => {
//   return (
//     <section className="relative w-[94%] mx-auto h-[60vh] md:h-[90vh] flex items-center justify-start overflow-hidden rounded-md ">
//       {/* 🔹 Full Background Image */}
//       <Image
//         src="/cpl.png"
//         alt="Agents Group"
//         fill
//         className="object-cover object-[center_85%] "
//         priority
//       />

//       {/* 🔹 Text Content */}
//       <div className="absolute inset-0 flex items-center px-6 sm:px-10 md:px-20">
//         <div className="max-w-2xl py-10 space-y-4 text-gray-900">
//           <p className="text-sm tracking-widest text-gray-700 uppercase">
//            ~ For Travel ~
//           </p>
//           <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
//             Agents Group <br /> Organizers
//           </h2>
//           <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-md">
//             Whether you handle small groups or large delegations, our platform
//             simplifies coordination, payments, and communication — all in one
//             place.
//           </p>
//           <button className=" text-black bg-white text-sm font-medium px-6 py-2 rounded-md hover:bg-gray-300  transition">
//             Join an Agent
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AgentGroup;




"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AgentGroup = () => {
  const router = useRouter();
  return (
    <section className="relative w-[90%] mx-auto h-[90vh] md:h-[90vh] flex flex-col md:flex-row items-center justify-between overflow-hidden  bg-white ">
  {/* 🔹 Background Image */}
  <Image
    src="/bnr.png"
    alt="Background Banner"
    fill
    className="object-cover object-center"
  />

  {/* 🔹 Text Section */}
  <div className="relative z-10 flex-1 pl-4 sm:pl-8 md:pl-16 text-gray-900  mb-6 md:mb-0">
    <p className="text-sm font-semibold tracking-wider text-gray-600 uppercase mb-2">
      ~ For Travel ~
    </p>
    <h1 className="text-3xl md:text-4xl leading-tight mb-4">
      Agents Group <br /> Organizers
    </h1>
  <span className="text-gray-700 text-sm md:text-base leading-relaxed block max-w-[20rem] md:max-w-md">
  Whether you handle  small groups or large <br /> delegations, our platform
  simplifies coordination, <br /> payments, and communication — all in one place.
</span>

    <button  onClick={() => router.push("/dashboard")} className="bg-white mt-5 text-gray-800 border border-gray-300 text-sm font-medium px-6 py-2 rounded-md hover:bg-gray-200 transition">
      Join an Agent
    </button>
  </div>

  <div className="relative flex-1 flex justify-center md:justify-end items-end">
    <Image
      src="/cpl.png"
      alt="Agent"
      width={550} 
      height={350}
      className="object-contain translate-y-2 translate-x-2 md:translate-x-10"
    />
  </div>
</section>

  );
};

export default AgentGroup;
