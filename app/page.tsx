"use client"

import axios from "axios";
import AppointmentList from "./components/AppointmentList";
import BookingForm from "./components/bookingComponent";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [appointments, setAppointments] = useState<any[]>([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("https://spa-booking-backend-doxl.onrender.com/appointments/get-appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Error fetching appointments.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);
  
  return (
    <div>
      <div>
      <BookingForm fetchAppointments={fetchAppointments} />
      <AppointmentList appointments={appointments} fetchAppointments={fetchAppointments} />
    </div>
    </div>
  );
}
