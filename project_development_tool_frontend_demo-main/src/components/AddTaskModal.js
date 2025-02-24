import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import BtnPrimary from './BtnPrimary'
import BtnSecondary from './BtnSecondary'
import axios from 'axios'
import toast from 'react-hot-toast'

const AddTaskModal = ({ isAddTaskModalOpen, setAddTaskModal, projectId = null, taskId = null, edit = false, refreshData }) => {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('');

    useEffect(() => {
        if (edit && isAddTaskModalOpen) {
            axios.get(`http://localhost:9000/project/${projectId}/task/${taskId}`)
                .then((res) => {
                    setTitle(res.data[0].task[0].title)
                    setDesc(res.data[0].task[0].description)
                })
                .catch((error) => {
                    toast.error('Something went wrong')
                })
            console.log('edit function call')
        }
    }, [isAddTaskModalOpen]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!edit) {
            axios.post(`http://localhost:9000/project/${projectId}/task`, { title, description: desc })
                .then((res) => {
                    setAddTaskModal(false)
                    toast.success('Task created successfully')
                    setTitle('')
                    setDesc('')
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        toast.error(error.response.data.details[0].message)
                    } else {
                        toast.error('Something went wrong')
                    }
                })
        } else {
            axios.put(`http://localhost:9000/project/${projectId}/task/${taskId}`, { title, description: desc })
                .then((res) => {
                    setAddTaskModal(false)
                    toast.success('Task is updated')
                    refreshData(true)
                    setTitle('')
                    setDesc('')
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        toast.error(error.response.data.details[0].message)
                    } else {
                        toast.error('Something went wrong')
                    }
                })
        }
    }

    return (
        <Transition appear show={isAddTaskModalOpen} as={Fragment}>
            <Dialog as='div' open={isAddTaskModalOpen} onClose={() => setAddTaskModal(false)} className="relative z-50">
                <div className="fixed inset-0 overflow-y-auto">
                    <Transition.Child
                        as={Fragment}
                        enter="fade-enter"
                        enterFrom="fade-enter-from"
                        enterTo="fade-enter-to"
                        leave="fade-leave"
                        leaveFrom="fade-leave-from"
                        leaveTo="fade-leave-to"
                    >
                        <div className="modal-backdrop" />
                    </Transition.Child>
                    <div className="modal-container">
                        <Transition.Child
                            as={Fragment}
                            enter="modal-enter"
                            enterFrom="modal-enter-from"
                            enterTo="modal-enter-to"
                            leave="modal-leave"
                            leaveFrom="modal-leave-from"
                            leaveTo="modal-leave-to"
                        >
                            <Dialog.Panel className="modal-panel">

                                <Dialog.Title as='div' className="modal-title-container">
                                    {!edit ? (<h1 className="modal-title">Add Task</h1>) : (<h1 className="modal-title">Edit Task</h1>)}
                                    <button onClick={() => setAddTaskModal(false)} className="modal-close-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </Dialog.Title>
                                <form onSubmit={handleSubmit} className="modal-form">
                                    <div className="form-group">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-input" placeholder='Task title' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Description" className="form-label">Description</label>
                                        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="form-textarea" rows="6" placeholder='Task description'></textarea>
                                    </div>
                                    <div className="form-actions">
                                        <BtnSecondary onClick={() => setAddTaskModal(false)}>Cancel</BtnSecondary>
                                        <BtnPrimary>Save</BtnPrimary>
                                    </div>
                                </form>

                            </Dialog.Panel>
                        </Transition.Child>

                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default AddTaskModal