"use client";

import SuiteMateLoader from "@/components/loader";
import apiService from "@/controllers/apiService";
import { useState, useEffect } from "react";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    apiService
      .myApplications()
      .then((applicationsData) => {
        setApplications(applicationsData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching applications data:", error);
        setIsLoading(false);
      });
    console.log("Calling");
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">My Applications</h1>
      </div>

      {isLoading && <SuiteMateLoader />}

      {!isLoading && applications.length === 0 && <p>No applications found.</p>}

      {!isLoading && applications.length > 0 && (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Apartment No</th>
                  <th className="px-4 py-2">Property Name</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {applications.map((application, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border px-4 py-2">
                      {application.apartment_no}
                    </td>
                    <td className="border px-4 py-2 ">
                      {application.property_name}
                    </td>
                    <td className="border px-4 py-2">{application.price}</td>
                    <td className="border px-4 py-2">
                      {application.status === "approved" ? (
                        <span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          Approved
                        </span>
                      ) : application.status === "rejected" ? (
                        <span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                          Rejected
                        </span>
                      ) : (
                        <span class="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyApplications;
