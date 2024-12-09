"use client";
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const AppointmentList = ({ appointments }: { appointments: any[] }) => {
  return (
    <Table aria-label="Appointment List">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Phone</TableColumn>
        <TableColumn>Service</TableColumn>
        <TableColumn>Time</TableColumn>
        <TableColumn>Date</TableColumn>
        <TableColumn>Notes</TableColumn>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.id}</TableCell>
            <TableCell>{appointment.name}</TableCell>
            <TableCell>{appointment.phone}</TableCell>
            <TableCell>{appointment.service}</TableCell>
            <TableCell>{appointment.time}</TableCell>
            <TableCell>{appointment.date}</TableCell>
            <TableCell>{appointment.notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AppointmentList;
