import React, { useEffect, useState } from "react";
import "../styles/booking-list.css";
import axios from "axios";

export default function BookingList() {
  const [data, setData] = useState([]);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    handleBookingDetails();
  }, []);

  const handleBookingDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/bookings");
      if (response.status === 200) {
        const userBookings = response.data.filter(
          (booking) => booking.userId.toString() === userId
        );
        setData(userBookings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (booking) => {
    const newCustomerName = prompt("Enter new customer name", booking.customer_name);
    const newAddress = prompt("Enter new address", booking.address);
    const newDateTime = prompt("Enter new date and time (ISO format)", booking.date_time);
    const newService = prompt("Enter new service type", booking.service_type);

    if (
      newCustomerName &&
      newAddress &&
      newDateTime &&
      newService
    ) {
      try {
        const response = await axios.put(
          `http://localhost:5000/bookings/${booking._id}`,
          {
            customer_name: newCustomerName,
            address: newAddress,
            date_time: newDateTime,
            service_type: newService,
            userId: userId,
          }
        );
        if (response.status === 200) {
          alert("Booking updated successfully");
          handleBookingDetails();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/bookings/${bookingId}`);
        if (response.status === 200) {
          alert("Booking cancelled successfully");
          handleBookingDetails();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="booking-list">
        {data.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          data.map((details) => (
            <ul
              key={details._id}
              className="max-w-md divide-y divide-gray-200 dark:divide-gray-700"
            >
              <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {details.customer_name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {details.address}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {details.service_type}
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <button
                      type="button"
                      onClick={() => handleEdit(details)}
                      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <button
                      type="button"
                      onClick={() => handleCancel(details._id)}
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          ))
        )}
      </div>
    </div>
  );
}
