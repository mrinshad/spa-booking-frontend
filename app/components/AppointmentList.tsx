"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";

const AppointmentList = ({
  appointments,
  fetchAppointments,
}: {
  appointments: any[];
  fetchAppointments: () => void;
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    number | null
  >(null);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  // Show delete modal with confirmation
  const handleDeleteClick = (phone: number) => {
    setSelectedAppointmentId(phone);
    setIsDeleteOpen(true);
  };

  // Show edit modal with pre-filled data
  const handleEditClick = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsEditModalVisible(true);
  };

  // Close delete modal
  const onDeleteClose = () => {
    setIsDeleteOpen(false);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  // Delete appointment
  const handleDelete = async () => {
    try {
      await axios.post("http://localhost:8080/appointments/cancel", {
        phone: selectedAppointmentId,
      });
      // alert("Appointment deleted!");
      fetchAppointments();
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("There was an error deleting the appointment.");
    }
  };

  // Edit appointment
  const handleEdit = async () => {
    try {
      const { name, phone, service, time, date, notes } = selectedAppointment;
      await axios.post("http://localhost:8080/appointments/modify", {
        id: selectedAppointmentId,
        name,
        phone,
        service,
        time,
        date,
        notes,
      });
      // alert("Appointment updated!");
      fetchAppointments();
      setIsEditModalVisible(false); 
    } catch (error) {
      console.error("Error editing appointment:", error);
      alert("There was an error updating the appointment.");
    }
  };

  // Update selected appointment state
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setSelectedAppointment((prevState: any) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  return (
    <div>
      <Table aria-label="Appointment List">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>Service</TableColumn>
          <TableColumn>Time</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.name}</TableCell>
              <TableCell>{appointment.phone}</TableCell>
              <TableCell>{appointment.service}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEditClick(appointment)}
                  color="primary"
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteClick(appointment.phone)}
                  color="danger"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal
        backdrop="opaque"
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteClose}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete Appointment
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this appointment?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="light" onPress={onDeleteClose}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Appointment Modal */}
      <Modal
        backdrop="opaque"
        isOpen={isEditModalVisible}
        onOpenChange={closeEditModal}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Edit Appointment
          </ModalHeader>
          <ModalBody>
            <Input
              value={selectedAppointment?.name}
              onChange={(e) => handleInputChange(e, "name")}
              label="Name"
              fullWidth
            />
            <Input
              value={selectedAppointment?.phone}
              onChange={(e) => handleInputChange(e, "phone")}
              label="Phone"
              fullWidth
            />
            <Input
              value={selectedAppointment?.service}
              onChange={(e) => handleInputChange(e, "service")}
              label="Service"
              fullWidth
            />
            <Input
              value={selectedAppointment?.time}
              onChange={(e) => handleInputChange(e, "time")}
              label="Time"
              type="time"
              fullWidth
            />
            <Input
              value={selectedAppointment?.date}
              onChange={(e) => handleInputChange(e, "date")}
              label="Date"
              type="date"
              fullWidth
            />
            <Textarea
              value={selectedAppointment?.notes}
              onChange={(e) => handleInputChange(e, "notes")}
              label="Notes"
              fullWidth
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleEdit}>
              Save Changes
            </Button>
            <Button color="danger" onPress={closeEditModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AppointmentList;
