import React, { useEffect, useState } from 'react';
import './App.css';
import DoctorCard from './components/DoctorCard';
import ServiceList from './components/ServiceList';
import AppointmentForm from './components/AppointmentForm';

const App = () => {
  const [resolvedTeamData, setResolvedTeamData] = useState([]);
  const [medicalServices, setMedicalServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const API_URL = '/api/awakelab/m5-ep1/equipo.json';

  const fetchDoctors = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error al obtener los datos del equipo médico');
      }
      const data = await response.json();
      console.log('Datos obtenidos:', data);

      const resolvedData = data.map((doctor) => ({
        ...doctor,
        imagen: new URL(`./assets/img/${doctor.imagen.split('/').pop()}`, import.meta.url).href,
      }));
      console.log('Datos resueltos:', resolvedData);

      setResolvedTeamData(resolvedData);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  useEffect(() => {
    const initialMedicalServices = ["Urgencias", "Consultas Médicas", "Hospitalización", "Toma de Muestras"];
    setMedicalServices(initialMedicalServices);
    fetchDoctors(); 
  }, []);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const addAppointment = (newAppointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
  };

  const specialties = [...new Set(resolvedTeamData.map((doctor) => doctor.especialidad))];

  const reloadDoctors = () => {
    fetchDoctors(); 
  };

  return (
    <div className="App">
      <div className="service-list-container">
        <ServiceList
          services={medicalServices}
          onServiceSelect={handleServiceSelect}
        />
      </div>

      <AppointmentForm
        specialties={specialties}
        doctors={resolvedTeamData}
        onAppointmentSubmit={addAppointment}
      />

      {appointments.length > 0 && (
        <div className="appointments">
          <h2>Citas Agendadas</h2>
          <ul>
            {appointments.map((appointment, index) => (
              <li key={index}>
                <strong>Paciente:</strong> {appointment.patientName} | <strong>Doctor:</strong> {appointment.doctor} | <strong>Fecha:</strong> {appointment.appointmentDate}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={reloadDoctors} className="reload-doctors-btn">
        Recargar Doctores
      </button>

      <h2>Equipo Médico</h2>
      <div className="doctor-list">
        {resolvedTeamData.length > 0 ? (
          resolvedTeamData.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))
        ) : (
          <p>No se encontraron datos del equipo médico.</p>
        )}
      </div>
    </div>
  );
};

export default App;
