"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState, useEffect, useCallback } from "react";
import apiService from "@/controllers/apiService";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const UnitDetails = () => {
  const params = useParams();
  const { id } = params;
  const [unit, setUnit] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appStatus, setAppStatus] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    apiService.unitDetails({ unit_id: id }).then((unitDetails) => {
      setUnit(unitDetails);
    });
  }, []);

  const handleSubmitApplication = async () => {
    try {
      const response = await apiService
        .submitApplication({ unit_id: id })
        .then((response) => {
          toast.success("Applied Successfully !");
          push("/my_applications");
        });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Already Applied!");
    }
  };

  const {
    apartment_no,
    area,
    availability,
    bathrooms,
    bedrooms,
    photos,
    price,
    property_name,
  } = unit;
  return (
    <div>
      {" "}
      {!unit && <div>Loading</div>}
      {unit && photos && (
        <div className="max-w-lg mx-auto p-4">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {property_name}
            </h2>
          </div>
          <div className="mb-8">
            <img
              src={photos[0]}
              alt={`Apartment ${apartment_no}`}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <table className="w-full border-collapse bg-white rounded-lg shadow-md">
            <tbody>
              <tr>
                <td className="px-4 py-2 font-semibold">Apartment No:</td>
                <td className="px-4 py-2">{apartment_no}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">
                  Area (sq ft): {appStatus}
                </td>
                <td className="px-4 py-2">{area}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">Availability:</td>
                <td className="px-4 py-2">
                  {availability ? "Available" : "Unavailable"}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">Bathrooms:</td>
                <td className="px-4 py-2">{bathrooms}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">Bedrooms:</td>
                <td className="px-4 py-2">{bedrooms}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">Price ($):</td>
                <td className="px-4 py-2">{price.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={handleSubmitApplication}
            className={`text-white rounded-lg px-4 py-2 mt-6  ${
              !availability
                ? "cursor-not-allowed bg-orange-200"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
            disabled={!availability}
          >
            Submit Application
          </button>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default UnitDetails;
