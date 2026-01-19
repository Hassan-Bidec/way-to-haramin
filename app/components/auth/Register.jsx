"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { getCountryAndCities, loginCustomer, signupCustomer, verifyCustomerOtp } from "@/lib/api";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "@/lib/useAuthStore";
import Link from "next/link";


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [cityList, setCityList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
 const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
    const [form, setForm] = useState({
    full_name: "",
    email: "",
    contact_no: "",
    iqama_number: "",
    iqama_expiry_date: "",
    passport_number: "",
    passport_expiry_date: "",
    full_address: "",
    accommodation_address: "",
    nationality: "",
    city: "",
    password: "",
    confirm_password: "",
  });
const [customer, setCustomer] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.iqama_number.length !== 10) {
  toast.error("Iqama Number must be exactly 10 digits");
  return;
}

if (form.passport_number.length !== 12) {
  toast.error("Passport Number must be exactly 12 letters");
  return;
}

    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      const response = await signupCustomer(formData);  // payload ab FormData

      console.log("responseData", response);

      if (response.status == true) {
        toast.success("Registered successfully! Please login now.");
        // setIsLogin(true);
        setCustomer(response.customer);
        setOtpModal(true);
      } else {
        toast.error("Registration failed: " + response.message);
        console.error("Signup Error:", response.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };


const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const payload = {
      email: form.email,
      password: form.password,
    };

    const response = await loginCustomer(payload);

    console.log("Login Response:", response);

  if (
  response.status === false &&
  (
    response.message?.toLowerCase().includes("not verified") ||
    response.message?.toLowerCase().includes("verify")
  )
) {
  setCustomer({
    customer_no: response.customer_contact,
    id: response.customer_id,
  });
   toast.error(response.message)
  setOtpModal(true);  
  return;              
}


    if (response.status) {
      useAuthStore.getState().setAuthData({
        user: response.user,
        token: response.token,
        user_type: response.user_type,
      });

      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("auth_user", JSON.stringify(response.user));
      localStorage.setItem("auth_user_type", response.user_type);

      toast.success("Login successful!");
      router.push("/dashboard");
    } else {
      toast.error(response.message || "Invalid credentials!");
    }
  } catch (err) {
    console.error("Unexpected login error:", err);
    toast.error("Something went wrong during login.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCountryAndCities();
        const countries = data?.data?.countries || [];
        const cities = data?.data?.cities || [];
        setCityList(cities);
        setCountryList(countries);

        console.log("cityList", cityList);

        console.log("Getcities", data?.data?.cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

 const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next field
    if (index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // const verifyOtp = () => {
  //   const finalOtp = otp.join("");
  //   if (finalOtp !== "123456") {
  //     toast.error("Invalid OTP. Please try again.");
  //     return;
  //   }
  //   toast.success("OTP Verified!");
  //   setOtpModal(false);
  //   setIsLogin(true); // switch to login screen
  // };
const verifyOtp = async () => {
  const finalOtp = otp.join("");

  if (finalOtp.length !== 6) {
    toast.error("Please enter the 6-digit OTP");
    return;
  }

  try {
    setOtpLoading(true);

    const payload = {
      contact_no: isLogin ? customer.customer_no : form.contact_no,
      otp_code: finalOtp,
      customer_id: customer.id,
    };

    const response = await verifyCustomerOtp(payload);

    if (response.status == true) {
       // Save in Zustand store
        useAuthStore.getState().setAuthData({
          user: response.user,
          token: response.token,
          user_type: response.user_type,
        });

        // Also manually save in localStorage
        localStorage.setItem("auth_token", response.token);
        localStorage.setItem("auth_user", JSON.stringify(response.user));
        localStorage.setItem("auth_user_type", response.user_type);

    
      toast.success(response.message || "OTP Verified Successfully!");
      setOtpModal(false);
      setOtp(["", "", "", "", "", ""]);
      setForm({
    full_name: "",
    email: "",
    contact_no: "",
    iqama_number: "",
    iqama_expiry_date: "",
    passport_number: "",
    passport_expiry_date: "",
    full_address: "",
    accommodation_address: "",
    nationality: "",
    city: "",
    password: "",
    confirm_password: "",
  })
      router.push("/dashboard");
    } else {
      toast.error(response.message || "Invalid OTP");
    }
  } catch (error) {
    toast.error("Something went wrong while verifying OTP.");
  } finally {
    setOtpLoading(false);
  }
};




  return (
    <section className="flex flex-col md:flex-row hscreen w-full  overflow-y-auto ">
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
     <div
  className="md:w-1/2 hscreen flex flex-col justify-between items-center bg-cover bg-center fixed top-0 left-0 md:flex hidden"
  style={{
    backgroundImage: "url('/bgimg.png')",
  }}
>
  {/* 🔹 Back Button Left Top */}
  <div className="absolute top-4 left-4 z-20">
    <Link href="/">
      <button className="bg-transparent cursor-pointer border border-gray-200 text-white px-5 py-2 rounded-md hover:bg-gray-500 transition">
        Back to Home
      </button>
    </Link>
  </div>

  {/* Top Logo + Text */}
  <div className="w-full flex flex-col items-center p-6">
    <img
      src="/logo11.png"
      alt="logo"
      className="h-20 md:h-24 object-contain"
    />
    <p className="mt-2 text-white text-center md:text-2xl">
      Let's Build Something Exceptional Together. Take the first step toward your digital transformation with a free consultation from  experts.
    </p>
  </div>

  {/* Bottom Car Image */}
  <img
    src={isLogin ? "/cars1.png" : "/cars2.png"}
    alt="car"
    className="w-[95%] md:h-[500px] object-contain -mt-20"
    style={{ marginBottom: -0 }}
  />
</div>



      <div className="md:ml-[50%] w-full md:w-[50%] hscreen
px-6 md:px-12 py-10">
        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
          className="w-full max-w-lg space-y-4"
        >

          {/* Top Text */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">
              {isLogin ? "Welcome Back!" : "Create Your Account"}
            </h1>
            <p className="text-gray-600">
              {isLogin
                ? "Login to manage your travel bookings, payments, and groups all in one place."
                : "Register now and manage your travel bookings, payments, and groups all in one place."}
            </p>
          </div>

          {!isLogin ? (
            <>
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <label className="block mb-1 text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md "
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    />
                  </div>

                  <div className="md:w-1/2">
                    <label className="block mb-1 text-sm font-medium">Contact No (Saudi)</label>
                    <PhoneInput
                      country={"sa"}
                      disableDropdown={true}
                      countryCodeEditable={false}
                      inputClass="!w-full !p-2 !pl-12 !border !border-gray-300 !rounded-md !"
                      buttonClass="!border-gray-300 !"
                      containerClass="!w-full"
                      onChange={(phone) => setForm({ ...form, contact_no: phone })}
                    />
                  </div>

                </div>

                <div className="flex gap-4 flex-col md:flex-row">

                  <div className="md:w-1/2 relative">
  <label className="block mb-1 text-sm font-medium">Iqama Number</label>
  <input
    type="text"
    inputMode="numeric"
    pattern="[0-9]*"
    required
    className="w-full p-2 border border-gray-300 rounded-md "
    value={form.iqama_number}
    onChange={(e) => {
      // Remove all non-numeric characters
      // setForm({ ...form, iqama_number: e.target.value.replace(/\D/g, "") });
       const value = e.target.value.replace(/\D/g, ""); // only digits
    if (value.length <= 10) {
      setForm({ ...form, iqama_number: value });
    }
    }}
    onKeyDown={(e) => {
      // Allow only numbers, backspace, delete, arrow keys, tab
      if (
        !/[0-9]/.test(e.key) &&
        e.key !== "Backspace" &&
        e.key !== "Delete" &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "Tab"
      ) {
        e.preventDefault();
      }
    }}
  />
</div>



                  <div className="md:w-1/2 relative">
                    <label className="block mb-1 text-sm font-medium">Iqama Expiry Date</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      onKeyDown={(e) => e.preventDefault()}
                      className="w-full p-2 border border-gray-300 rounded-md "
                      onChange={(e) => setForm({ ...form, iqama_expiry_date: e.target.value })}
                    />
                  </div>
                </div>


                <div className="flex gap-4 flex-col md:flex-row">
                  {/* <div className="md:w-1/2 relative">
                    <label className="block mb-1 text-sm font-medium">Nationality</label>
                    <input type="text"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md "
                      onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                    />
                  </div> */}
                  <div className="md:w-1/2 relative">
                    <label className="block mb-1 text-sm font-medium">Nationality</label>
                    <select
                      required
                      className="w-full p-2 border border-gray-300 rounded-md "
                      value={form.nationality}  // city_id store hoga
                      onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                    >
                      <option value="">Select Nationality</option>
                      {countryList.map((country) => (
                        <option key={country.id} value={country.nationality}>
                          {country.nationality}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:w-1/2 relative">
                    <label className="block mb-1 text-sm font-medium">City</label>
                    <select
                      required
                      className="w-full p-2 border border-gray-300 rounded-md "
                      value={form.city_id}  // city_id store hoga
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    >
                      <option value="">Select City</option>
                      {cityList.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>





                </div>

                {/* Full Address */}
                <div>
                  <label className="block mb-1 text-sm font-medium">Residential Address</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md "
                    onChange={(e) => setForm({ ...form, full_address: e.target.value })}
                  />
                </div>


                <div className="flex gap-4 flex-col md:flex-row">
                  {/* Passport Number */}
                  <div className="md:w-1/2 relative">
                    <label className="block mb-1 text-sm font-medium">Passport Number</label>
                    <input
                      type="text"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md "
                      value={form.passport_number}
                      // onChange={(e) => setForm({ ...form, passport_number: e.target.value })}
                       onChange={(e) => {
      let value = e.target.value.toUpperCase(); // convert to uppercase automatically

      // allow only alphabets + numbers
      value = value.replace(/[^A-Z0-9]/gi, "");
console.log("Passport Value:", value);
      // limit to 12 characters (adjust if needed)
      if (value.length <= 12) {
        setForm({ ...form, passport_number: value });
      }
    }}
                    />
                  </div>

                  {/* Passport Expiry Date */}
                  <div className="md:w-1/2 relative">
                    <label className="block mb-1 text-sm font-medium">Passport Expiry Date</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      onKeyDown={(e) => e.preventDefault()}
                      className="w-full p-2 border border-gray-300 rounded-md "
                      onChange={(e) => setForm({ ...form, passport_expiry_date: e.target.value })}
                    />
                  </div>
                </div>


                {/* Accommodation Address */}
                {/* <div>
                  <label className="block mb-1 text-sm font-medium">Accommodation Address</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md "
                    onChange={(e) => setForm({ ...form, accommodation_address: e.target.value })}
                  />
                </div> */}

                {/* Email */}
                <div>
                  <label className="block mb-1 text-sm font-medium">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md "
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                {/* Password + Confirm */}
                <div className="flex gap-4 flex-col md:flex-row">
                  <div className="md:w-1/2 relative">
                    <label className="block mb-1 text-sm font-medium">Password</label>
                    <input
                      // type="password"
                  type={showPassword ? "text" : "password"}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md "
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                     <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                >
                  {showPassword ? (
                    <BsFillEyeFill className="w-5 h-5" />
                  ) : (
                    <BsFillEyeSlashFill className="w-5 h-5" />
                  )}
                </span>
                    {/* <BsFillEyeSlashFill className="absolute right-3 top-9 text-gray-400 w-5 h-5" /> */}
                  </div>

                  <div className="md:w-1/2 relative">
                    <label className="block mb-1 text-sm font-medium">Confirm Password</label>
                    <input
                       type={confirmPassword ? "text" : "password"}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md "
                      onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
                    />

                     <span
                  onClick={() => setConfirmPassword(!confirmPassword)}
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                >
                  {confirmPassword ? (
                    <BsFillEyeFill className="w-5 h-5" />
                  ) : (
                    <BsFillEyeSlashFill className="w-5 h-5" />
                  )}
                </span>
                    {/* <BsFillEyeSlashFill className="absolute right-3 top-9 text-gray-400 w-5 h-5" /> */}
                  </div>
                </div>

              </div>


              <button
                type="submit"
                className={`w-full py-2 px-4 bg-[#206D69] text-white rounded-md font-medium transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#175953]"
                  }`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Register"}
              </button>

              <p className="text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-[#206D69] font-medium hover:underline"
                >
                  Login
                </button>
              </p>
            </>
          ) : (
            <>
              {/* Login Fields */}
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md "
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="relative">
                <label className="block mb-1 text-sm font-medium">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md "
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                >
                  {showPassword ? (
                    <BsFillEyeFill className="w-5 h-5" />
                  ) : (
                    <BsFillEyeSlashFill className="w-5 h-5" />
                  )}
                </span>
              </div>

              <button
                type="submit"
                className={`w-full py-2 px-4 bg-[#206D69] text-white rounded-md font-medium transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#175953]"
                  }`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Login"}
              </button>

              <p className="text-sm text-gray-600 text-center">
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-[#206D69] font-medium hover:underline"
                >
                  Register
                </button>
              </p>
            </>
          )}
        </form>
      </div>
    {otpModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md relative">
      {/* Close Button */}
      <button
        onClick={() => {setOtpModal(false) , setOtp(["", "", "", "", "", ""])}}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Enter OTP
      </h2>
      <p className="text-gray-500 text-center mt-1 mb-5">
        Please enter the 6-digit code sent to your email.
      </p>

      {/* OTP Input Boxes */}
      <div className="flex justify-between gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            ref={(el) => (inputRefs.current[index] = el)}
            value={otp[index] || ""}
            onChange={(e) => handleOtpChange(e, index)}
            onKeyDown={(e) => handleOtpKeyDown(e, index)}
            className="w-10 h-10 md:w-12 md:h-12 border border-gray-300 rounded-lg text-center text-xl font-semibold focus:border-[#206D69] focus:ring-1 focus:ring-[#206D69] outline-none"
          />
        ))}
      </div>

      {/* Verify Button */}
      <button
        onClick={verifyOtp}
        disabled={otpLoading}
        className="mt-6 w-full bg-[#206D69] hover:bg-[#1b5a56] text-white py-3 rounded-lg font-semibold transition-all"
      >
      {otpLoading ? "Verifying..." : "Verify OTP"}  
      </button>
    </div>
  </div>
)}


    </section>
  );
}