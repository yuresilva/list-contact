import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import { Fragment } from 'react';

interface Props {
  onCancel: () => void;
  onConfirm: (contact: number) => void;
  title: string;
  message?: string;
  cancelButtonText: string;
  confirmButtonText: string;
  isOpen: boolean;
  onClose: () => void;
}


export const Dialog = ({ cancelButtonText, onCancel, isOpen, confirmButtonText, onConfirm, message, onClose, title }: Props) => {

  return (
    <Transition appear show={isOpen}>
      <HeadlessDialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <HeadlessDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <HeadlessDialog.Title
                  as="h2"
                  className="text-lg font-medium leading-6 text-gray-900"
                >{title}
                </HeadlessDialog.Title>
                {message && <div className="mt-2">
                  <p className="text-sm">{message}</p>
                </div>
                }
                <div className="flex justify-end mt-4">
                  <button
                    onClick={onCancel}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded-md"
                  >
                    {cancelButtonText}
                  </button>
                  <button
                    onClick={onConfirm as () => void}
                    className="bg-error hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                  >
                    {confirmButtonText}
                  </button>
                </div>
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}
