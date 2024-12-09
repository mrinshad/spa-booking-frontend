"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Textarea } from "@nextui-org/react";

// Accept fetchAppointments as a prop
const BookingForm = ({
  fetchAppointments,
}: {
  fetchAppointments: () => void;
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(
        "https://spa-booking-backend-doxl.onrender.com/appointments/book", // Correct route path
        {
          name,
          phone,
          service,
          time,
          date,
          notes,
        }
      );
      // alert("Booking successful!");
      fetchAppointments(); 

      setName("");
      setPhone("");
      setService("");
      setTime("");
      setDate("");
      setNotes("");
    } catch (error) {
      console.error(error);
      alert("There was an error with your booking.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="w-2/3 flex flex-col items-center m-5 space-y-4"
        onSubmit={handleSubmit}
      >
        <h1>Enter your details</h1>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          required
        />
        <Input
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Service"
          required
        />
        <Input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          type="time"
          placeholder="Time"
          required
        />
        <Input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          placeholder="Date"
          required
        />

        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
        />

        <Button className="w-1/2" type="submit">
          Submit Booking
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
