import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";

const RoommatePrefsModal = ({
  isOpen,
  setIsOpen,
  selectedRoommate,
  currentUserPreferences,
  currentUserPrefMap,
}) => {
  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base text-center font-semibold leading-6 text-gray-900">
                          Preferences of {selectedRoommate.first_name}
                        </Dialog.Title>
                      </div>
                      <div className="flex flex-col items-center border-t border-gray-200 rounded dark:border-gray-700 px-4 mt-4">
                        <table className="min-w-full">
                          <thead>
                            <tr>
                              <th className="px-4 py-2">Preference</th>
                              <th className="px-4 py-2">Value</th>
                              <th className="px-4 py-2">Your Value</th>
                            </tr>
                          </thead>
                          {selectedRoommate &&
                            selectedRoommate.prefs &&
                            selectedRoommate.prefs.map((pref, index) => (
                              <tr
                                className={
                                  currentUserPrefMap[pref.pref_id]?.value ===
                                  pref.value
                                    ? "bg-green-100"
                                    : "bg-red-100"
                                }
                              >
                                <td className="border px-4 py-2">
                                  {pref.pref_name}
                                </td>
                                <td className="border px-4 py-2">
                                  {pref.value}
                                </td>
                                <td className="border px-4 py-2">
                                  {(currentUserPrefMap &&
                                    currentUserPrefMap[pref.pref_id]?.value) ||
                                    "-"}
                                </td>
                              </tr>
                            ))}
                        </table>
                      </div>

                      <div className="px-4 sm:px-6 mt-4">
                        <Dialog.Title className="text-base text-center font-semibold leading-6 text-gray-900">
                          Your Preferences
                        </Dialog.Title>
                      </div>
                      <div className="flex flex-col items-center border-t border-gray-200 rounded dark:border-gray-700 px-4 mt-4">
                        <table className="min-w-full">
                          <thead>
                            <tr>
                              <th className="px-4 py-2">Preference</th>
                              <th className="px-4 py-2">Value</th>
                            </tr>
                          </thead>
                          {currentUserPreferences &&
                            currentUserPreferences &&
                            currentUserPreferences.map &&
                            currentUserPreferences.map((pref, index) => (
                              <tr
                                className={
                                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                }
                              >
                                <td className="border px-4 py-2">
                                  {pref.pref_name}
                                </td>
                                <td className="border px-4 py-2">
                                  {pref.value}
                                </td>
                              </tr>
                            ))}
                        </table>
                      </div>
                      <div className="flex flex-col items-center border-t border-gray-200 rounded dark:border-gray-700 px-4 mt-4">
                        <span className="mt-4 text-sm">
                          Matched Preferences:{" "}
                          {Math.round(
                            selectedRoommate.similarity_ratio *
                              currentUserPreferences.length
                          )}{" "}
                          / {currentUserPreferences.length}
                        </span>
                      </div>
                      <div className="flex flex-col items-center border-t border-gray-200 rounded dark:border-gray-700 px-4 mt-4">
                        <span className="mt-4 text-xl">
                          Match:{" "}
                          {Math.round(selectedRoommate.similarity_ratio * 100)}%
                        </span>
                      </div>

                      <div className="mt-6 flex flex-col">
                        <div className="mt-4 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 inline-flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                              />
                            </svg>
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default RoommatePrefsModal;
