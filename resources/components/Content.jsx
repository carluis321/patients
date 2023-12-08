import React, { useEffect, useState } from 'react';
import Modal from './Shared/Modal';
import axios from 'axios';

export default function Content() {
  const [patients, setPatients] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const getPatients = async () => {
    const { data } = await axios.get('/patients');

    setPatients(data);
  }

  useEffect(() => {
    getPatients();
  }, []);

  const deletePatient = async (id) => {
    await axios.delete(`/patients/${id}`);

    await getPatients()
  }

  return (
    <div>
      <Modal openModal={openModal} onFadeout={() => { setOpenModal(false) }} onSubmit={() => getPatients()} />
      <button
        className='focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm'
        onClick={() => { setOpenModal(true) }}>
        Add Patient
      </button>
      <div className="flex flex-wrap gap-10 justify-stretch">
        {patients && patients.map((patient) => {
          return (
            <div className='basis-1/5 mb-3 rounded shadow-xl p-5 hover:cursor-pointer relative' key={patient.id}>
              <div className='absolute top-0 right-0 h-16 w-16'>
                <button
                  className='focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-red-500 transition duration-150 text-black-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-2 py text-sm'
                  onClick={() => deletePatient(patient.id)}>
                  X
                </button>
              </div>
              <div onClick={() => {}}>
                <div className='flex justify-center'>
                  {patient.document ? <img src={'/images/uploads/' + patient.document} className='w-1/2 aspect-square object-contain rounded' /> : ''}
                </div>
                <div className="name">
                  Name: {patient.name}
                </div>
                <div>
                  Email: {patient.email}
                </div>
                <div>
                  Phone: {patient.countryCode } {patient.phone}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
