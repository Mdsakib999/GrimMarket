import React, { useState } from "react";
import { MdContactPhone, MdOutlineSupportAgent } from "react-icons/md";

const Modal = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-[45%]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold py-3">{title}</h2>
          <button
            className="text-white text-xl"
            onClick={onClose}
          >
            ✖
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded-md bg-gray-900 border-none"
          />
          <textarea
            rows="3"
            placeholder="Description"
            className="w-full p-2 border rounded-md bg-gray-900 border-none"
          ></textarea>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

const Support = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (title) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <p className="text-3xl pt-6 text-center font-semibold text-gray-400">
        Premium Support
      </p>

      <div className="mt-16 flex justify-center gap-x-20 py-6">
        <div
          onClick={() => openModal("Emergency Support")}
          className="border border-green-500 text-lg font-semibold hover:text-green-500 py-5 px-10 rounded-md bg-green-600 bg-opacity-10 cursor-pointer"
        >
          <MdOutlineSupportAgent className="text-6xl mx-auto mb-2" />
          <p>Emergency Support</p>
        </div>
        <div
          onClick={() => openModal("Regular Support")}
          className="border border-green-500 text-lg font-semibold hover:text-green-500 py-5 px-10 rounded-md bg-green-600 bg-opacity-10 cursor-pointer"
        >
          <MdContactPhone className="text-5xl mx-auto mb-2" />
          <p>Regular Support</p>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle} />
    </div>
  );
};

export default Support;
