import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

interface AddNotesProps {
    open: boolean,
    setOpen: any,
    addNotes: any,
}

export default function AddNotes({
    open,
    setOpen,
    addNotes,
}: AddNotesProps) {

    function closeModal() {
        setOpen(false)
    }

    function enterNotes() {
        const text = document.querySelector('textarea')?.value
        addNotes(text)
        closeModal()
    }

    return (
        <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Notes
                  </Dialog.Title>
                  <div className="mt-2">
                    <textarea
                        className="
                            bg-gray-50 border text-gray-900 text-sm rounded-lg border-gray-300 border-2
                            focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                        " 
                        placeholder="Enter your notes" required/>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={enterNotes}
                    >
                      Enter
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
}