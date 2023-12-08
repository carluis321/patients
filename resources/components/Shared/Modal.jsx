import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { isValidEmail, isValidLetterString } from '../../utils/utils';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ['JPG', 'jpg']


export default function Modal({ openModal, onFadeout, onSubmit }) {
  const modalRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => {
    setShowModal(openModal)
  }, [openModal])

  useEffect(() => {
    if (showModal) {
      fadeIn(modalRef);
    } else {
      onFadeout();
      fadeOut(modalRef);
    }
  }, [showModal])

  const fadeOut = () => {
    if (!modalRef.current)
      return

    modalRef.current.style.opacity = 1;
    (function fade() {
      if ((modalRef.current.style.opacity -= 0.1) < 0) {
        modalRef.current.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }

    })();
  }

  const fadeIn = (display) => {
    if (!modalRef.current)
      return

    modalRef.current.style.opacity = 0;
    modalRef.current.style.display = display || "flex";
    (function fade() {
      let val = parseFloat(modalRef.current.style.opacity);
      if (!((val += 0.2) > 1)) {
        modalRef.current.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }

  const closeModal = () => {
    setShowModal(false)
    resetStates()
  }

  const resetStates = () => {
    setName('')
    setEmail('')
    setAddress('')
    setCountryCode('')
    setPhone('')
    setFile(null)
    setErrors({})

    setTimeout(() => {
      setShowModal(false);
      setSentSuccess(false);
    }, 2500)
  }

  const handleChange = (file) => {
    setFile(file);
  }

  const validatePhone = () => {
    const errors = {};
    if (phone.length > 7 && countryCode.length === 0) {
      errors.phone = 'Country code is required if the phone number is present';
    }

    if (
      phone.length > 7 &&
      countryCode.length > 0 &&
      !countryCode.startsWith('+')
    ) {
      errors.phone = 'Country code must start with +';
    }

    if (phone.length > 7 && isNaN(phone)) {
      errors.phone = 'Phone number should be only numbers';
    }

    return errors;
  }

  const validateFields = () => {
    const errors = {};

    if (!isValidLetterString(name)) {
      errors.name = 'Field name is not valid, should be more than 2 characteres and only have letters'
    }

    if (!isValidEmail(email)) {
      errors.email = 'Field Email is not valid, only accepts @gmail.com'
    }

    if (!file) {
      errors.file = 'The document is required'
    }

    Object.assign(errors, validatePhone())

    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return false
    }

    setErrors({})
    return true;
  }

  const submit = async () => {
    const valid = validateFields();

    if (!valid) return;

    const form = new FormData();

    form.append('name', name);
    form.append('email', email);
    form.append('address', address);
    form.append('countryCode', countryCode);
    form.append('phone', phone);
    form.append('file', file);

    await axios.post('/patients', form);

    resetStates();
    onSubmit();
    setSentSuccess(true)
  }

  return showModal && (
    <div className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" ref={modalRef}>
      <div className="relative py-8 px-5 lg:w-2/4 md:w-1/2 sm:w-full md:px-10 bg-white shadow-md rounded border border-gray-400 mx-auto">
        <div className="w-full flex justify-start text-gray-600 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width="52" height="52" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
            <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
          </svg>
        </div>
        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Enter Patient Details</h1>

        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Name</label>
        <input
          className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {errors.name && (
          <div className="bg-red-600 p-2 mt-2 mb-3 rounded text-white">
            {errors.name}
          </div>
        )}

        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email</label>
        <input
          className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {errors.email && (
          <div className="bg-red-600 p-2 mt-2 mb-3 rounded text-white">
            {errors.email}
          </div>
        )}


        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Address</label>
        <input
          className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          value={address}
          onChange={(e) => setAddress(e.target.value)} />

        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Phone number</label>
        <div className="flex">
          <div className="flex-initial w-14 h-14">
            <input
              type="text"
              max="3"
              placeholder='+1'
              className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            />
          </div>
          <div className="flex-initial w-full ...">
            <input
              className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {errors.phone && (
          <div className="bg-red-600 p-2 mb-3 rounded text-white">
            {errors.phone}
          </div>
        )}

        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Document</label>
        <div className="mb-5 mt-2">
          <FileUploader handleChange={handleChange} name="file" types={fileTypes} />

          {errors.file && (
          <div className="bg-red-600 p-2 mb-3 mt-4 rounded text-white">
            {errors.file}
          </div>
        )}
        </div>
        <div className="flex items-center justify-start w-full">
          <button
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
            onClick={submit}
          >
            Submit
          </button>
          <button className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={closeModal}>Cancel</button>
        </div>
        <button className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={closeModal} aria-label="close modal" role="button">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {sentSuccess && (
          <div className='bg-green-600 p-6 mt-6 rounded text-white'>
            Patient created successfully
          </div>
        )}
      </div>
    </div>
  );
}