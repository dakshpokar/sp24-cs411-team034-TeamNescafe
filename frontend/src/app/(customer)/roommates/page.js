"use client";

import apiService from "@/controllers/apiService";
import { useState, useEffect } from "react";
import SuiteMateLoader from "@/components/loader";
import RoommatePrefsModal from "./roommate_prefs_modal";

const Roommates = () => {
  const [roommates, setRoommates] = useState([]);
  const [filteredRoommates, setFilteredRoomates] = useState([]);
  const [selectedRoommate, setSelectedRoommate] = useState({});
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUserPreferences, setCurrentUserPreferences] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    apiService
      .getRoommates()
      .then((roommatesData) => {
        setRoommates(roommatesData.roommates);
        setFilteredRoomates(roommatesData.roommates);

        roommatesData.roommates.map((roommate) => {
          return roommate.prefs.map((pref) => {
            pref.pref_name = roommatesData.preferences[pref.pref_id];
            return pref;
          });
        });
        roommatesData.current_user_preferences.map((pref) => {
          pref.pref_name = roommatesData.preferences[pref.pref_id];
          return pref;
        });
        setCurrentUserPreferences(roommatesData.current_user_preferences);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let filtered = roommates.filter((roommate) => {
      return (
        roommate.first_name.toLowerCase().includes(search.toLowerCase()) ||
        roommate.last_name.toLowerCase().includes(search.toLowerCase()) ||
        roommate.email_id.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredRoomates(filtered);
  }, [search]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Roommates</h1>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="p-2 border rounded-md"
        onChange={(e) => setSearch(e.target.value)}
      />
      {isLoading && <SuiteMateLoader />}
      {!isLoading && filteredRoommates.length === 0 && (
        <p>No roommates found</p>
      )}
      {!isLoading && filteredRoommates.length > 0 && (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email ID</th>
                  <th className="px-4 py-2">Similarity</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {filteredRoommates.map((roommate, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border px-4 py-2">
                      {roommate.first_name} {roommate.last_name}{" "}
                    </td>
                    <td className="border px-4 py-2">{roommate.email_id}</td>
                    <td className="border px-4 py-2 ">
                      {Math.round(roommate.similarity_ratio * 100)}%
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="p-2 bg-blue-500 text-white rounded-md"
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedRoommate(roommate);
                        }}
                      >
                        View Preferences
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <RoommatePrefsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedRoommate={selectedRoommate}
        currentUserPreferences={currentUserPreferences}
      />
    </main>
  );
};

export default Roommates;
