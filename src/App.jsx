import React, { useEffect, useState } from 'react';
import './App.css';
import DoctorCard from './components/DoctorCard';
import ServiceList from './components/ServiceList';

const App = () => {
  const [resolvedTeamData, setResolvedTeamData] = useState([]);
  const [medicalServices, setMedicalServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceError, setServiceError] = useState(null); 
  const [doctorsReloaded, setDoctorsReloaded] = useState(false); 

  const DOCTORS_API_URL = '/api/awakelab/m5-ep1/equipo.json';
  const SERVICES_API_URL = '/api/awakelab/m5-ep1/servicios.json'; // En el servidor se cambio el nombre a servicio.json para generar el error

  const fetchDoctors = async () => {
    try {
      const response = await fetch(DOCTORS_API_URL);
      if (!response.ok) {
        throw new Error('Error al obtener los datos del equipo médico');
      }
      const data = await response.json();
      const resolvedData = data.map((doctor) => ({
        ...doctor,
        imagen: new URL(`./assets/img/${doctor.imagen.split('/').pop()}`, import.meta.url).href,
      }));
      setResolvedTeamData(resolvedData);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(SERVICES_API_URL);
      if (!response.ok) {
        throw new Error('Error al obtener los servicios médicos');
      }
      const data = await response.json();
      setMedicalServices(data);
      setServiceError(null); 
    } catch (error) {
      console.error('Error al cargar los servicios:', error);
      setServiceError('Ocurrió un error al cargar los servicios médicos.'); 
    }
  };

  useEffect(() => {
    fetchServices(); 
  }, []);

  useEffect(() => {
    if (doctorsReloaded) {
      fetchDoctors();
      setDoctorsReloaded(false);  
    }
  }, [doctorsReloaded]); 

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const reloadDoctors = () => {
    setDoctorsReloaded(true); 
  };

  const reloadServices = () => {
    setServiceError(null); 
    fetchServices(); 
  };

  return (
    <div className="App">
      {serviceError && (
        <div className="error-message">
          <p>{serviceError}</p>
          <button onClick={reloadServices} className="reload-services-btn">
            Intentar nuevamente
          </button>
        </div>
      )}

      {!serviceError && (
        <div className="service-list-container">
          <ServiceList
            services={medicalServices}
            onServiceSelect={handleServiceSelect}
          />
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
