import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminBookingList from "../components/AdminBookingList";

export default function AdminDashboard() {
  return (
    <div>
      <AdminNavbar />
      <div className="container mx-auto mt-20 p-4">
        <AdminBookingList />
      </div>
    </div>
  );
}
