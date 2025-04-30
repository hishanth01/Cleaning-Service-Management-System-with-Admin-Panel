import React, { useEffect, useState } from "react";
import "../styles/booking-list.css";
import axios from "axios";

function BookinForm() {
  const [services, setServices] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [datetime, setDatetime] = useState("");
  const [serviceType, setServiceType] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/getservice");
        if (response.status === 200) {
          setServices(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem("userId");
    const formatDateTime = new Date(datetime).toISOString();
    const BookingData = {
      customer_name: customerName,
      address: address,
      date_time: formatDateTime,
      service_type: serviceType,
      userId: userId,
    };
    try {
      const response = await axios.post("http://localhost:5000/bookings", BookingData);
      if (response.status === 200) {
        alert("Your Booking is set successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="booking-container">
      <h1>BOOKNOW</h1>

      <form className="max-w-sm mx-auto" onSubmit={handleBooking}>
        <div className="mb-5">
          <label
            htmlFor="Name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Customer Name
          </label>
          <input
            type="text"
            name="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your address"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date and Time
          </label>
          <input
            type="datetime-local"
            name="datetime"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="service"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Service Type
          </label>
          <select
            name="service"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="" disabled>
              Select Service Type
            </option>
            {services.map((service) => (
              <option key={service._id} value={service.service}>
                {service.service}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Booking
        </button>
      </form>
    </div>
  );
}

export default BookinForm;
