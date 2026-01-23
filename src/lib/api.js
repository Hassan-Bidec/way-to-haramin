import api from "./axiosInstance";


// Get Country + Cities
export const getCountryAndCities = async () => {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/create`
    );
    return res.data;
  } catch (error) {
    console.error("API Error:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        "Something went wrong",
      error: error?.response?.data || null
    };
  }
};

// Customer Signup API: customer/store
export const signupCustomer = async (payload) => {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/store`,
      payload
    );

    return res.data;
  } catch (error) {
    console.error("Signup API Error:", error);

    return {
      success: false,
      message:
        error?.response?.data?.errors ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong",
      error: error?.response?.data || null
    };
  }
};


// ✅ Login API: login
export const loginCustomer = async (payload) => {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}login`,
      payload
    );

    return res.data; 
  } catch (error) {
    console.error("Login API Error:", error);

    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong",
      error: error?.response?.data || null
    };
  }
};

// Get Partners With Packages
export const getPartnersWithPackages = async () => {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}partners-with-packages`
    );

    return res.data; 
  } catch (error) {
    console.error("API Error:", error);

    return {
      status: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong",
      error: error?.response?.data || null
    };
  }
};

// Get Booking Parameters (cities, ride types, etc.)
export const getBookingParams = async () => {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}booking-params`
    );

    return res.data;
  } catch (error) {
    console.error("API Error:", error);

    return {
      status: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong",
      error: error?.response?.data || null
    };
  }
};

// Ride Booking API
export const rideBooking = async (payload) => {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}ride-booking`,
      payload
    );

    return res.data;
  } catch (error) {
    console.error("Ride Booking API Error:", error);

    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong",
      errors: error?.response?.data?.errors || null,
      error: error?.response?.data || null
    };
  }
};

// Get User Ride View
export const getUserRideView = async (customer_id) => {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user_ride_view`
    );

    return res.data;
  } catch (error) {
    console.error("User Ride View API Error:", error);

    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong",
      error: error?.response?.data || null
    };
  }
};

// Confirm Ride
export const confirmRide = async (ride_id) => {
  try {
    const res = await api.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}ride/${ride_id}/confirm`
    );

    return res.data;
  } catch (error) {
    console.error("Ride Confirm API Error:", error);

    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong",
      error: error?.response?.data || null
    };
  }
};

// Cancel Ride
export const cancelRide = async (ride_id) => {
  try {
    const res = await api.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}ride/${ride_id}/cancel`
    );

    return res.data;
  } catch (error) {
    console.error("Ride Cancel API Error:", error);

    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong",
      error: error?.response?.data || null
    };
  }
};

// Add Review & Rating for Ride
export const addReviewRating = async (payload) => {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}ride/add-review-rating`,
      payload
    );

    return res.data;
  } catch (error) {
    console.error("Add Review Rating API Error:", error);

    return {
      status: false,
      message:
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        "Something went wrong",
      errors: error?.response?.data?.errors || null,
      error: error?.response?.data || null
    };
  }
};

// dashboard 
export const Dashboard = async () => {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user-dashboard`
    );

    return {
      status: true,
      data: res.data
    };

  } catch (error) {
    console.error("User Ride View API Error:", error);

    return {
      status: false,
      message:
        error?.response?.data?.message || "Something went wrong",
      error: error?.response?.data || null
    };
  }
};

// Get Logged-in User Profile
export const getUserProfile = async () => {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user-profile`
    );
    return res.data;
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};

// Edit User Profile
export const editProfile = async (payload) => {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}edit-user-profile`,
      payload
    );
    return {
      status: true,
      message: "Profile updated successfully",
      data: res.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || "Failed to update profile",
    };
  }
};

// Get FAQs
export const getFAQs = async () => {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}FAQs`
    );

    return res.data || res;
  } catch (error) {
    console.error("FAQs API Error:", error);

    return {
      status: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong",
      error: error?.response?.data || null,
    };
  }
};

// Register Complain
export const registerComplain = async (payload) => {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}register-complain`,
      payload
    );

    return res.data;
  } catch (error) {
    console.error("Register Complain API Error:", error);
    const validationErrors = error?.response?.data?.errors;

    // Unified readable message:
    let message =
      error?.response?.data?.message ||
      (validationErrors
        ? Object.values(validationErrors)[0][0] // first validation message
        : null) ||
      error?.message ||
      "Something went wrong";

    return {
      status: false,
      message,
      errors: validationErrors || null,
      raw: error?.response?.data || null, // raw error for debugging if needed
    };
  }
};

// Book Package API
export const bookPackage = async (payload) => {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/book-package`,
      payload
    );

    return res.data;
  } catch (error) {
    console.error("Book Package API Error:", error);

    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong",
      errors: error?.response?.data?.errors || null,
      error: error?.response?.data || null
    };
  }
};

// Verify OTP API
export const verifyCustomerOtp = async (payload) => {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/otp-login`,
      payload
    );

    return res.data;
  } catch (error) {
    console.error("OTP Verify API Error:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        "Something went wrong",
      error: error?.response?.data || null
    };
  }
};

// Get User Packages
export const getUserPackages = async (customer_id) => {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/booked-package-details?customer_id=${customer_id}`
    );
    return res.data;
  } catch (error) {
    console.error("User Packages API Error:", error);

    return {
      status: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong",
      error: error?.response?.data || null
    };
  }
};

// Cancel Package
// src/lib/api.js
export const cancelPackage = async (payload) => {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/cancel-package`,
      payload // ✅ yahan payload bhej rahe hain
    );

    return res.data;
  } catch (error) {
    console.error("Cancel API Error:", error);

    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong",
      error: error?.response?.data || null
    };
  }
};
