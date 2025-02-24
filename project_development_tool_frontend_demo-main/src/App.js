import React, { useState, useCallback } from "react";
import AppLayout from "./components/AppLayout";
import { Routes, Route } from "react-router-dom";
import Task from "./components/Task";
import { Toaster } from "react-hot-toast";
import AddProjectModal from "./components/AddProjectModal";

function App() {
  const [isModalOpen, setModalState] = useState(false);

  const openModal = useCallback(() => {
    setModalState(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalState(false);
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800 font-[Poppins] min-h-screen">
      <AppLayout>
        <Toaster position="top-right" gutter={8} />
        <Routes>
          <Route path="/:projectId" element={<Task />} />
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center w-full pt-10">
                <img
                  src="./image/image.png"
                  className="w-5/12 transition-transform duration-300 ease-in-out hover:scale-105"
                  alt="Project"
                />
                <br />
                <h1 className="text-xl font-semibold text-gray-700">
                  Select or create a new project
                </h1>
                <button
                  onClick={openModal}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all hover:bg-blue-600 active:scale-95 mt-4"
                >
                  Create New Project
                </button>
              </div>
            }
          />
        </Routes>
      </AppLayout>
      <AddProjectModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default App;
