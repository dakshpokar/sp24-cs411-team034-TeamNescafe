"use client";
import SuiteMateLoader from "@/components/loader";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/controllers/apiService";

const Logout = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");

    apiService
      .signout({ token: token })
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        push("/");
      })
      .catch(() => {
        setLoading(false);
        console.log("Error in signout");
      });
  }, []);
  return (
    <>
      {loading && (
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <SuiteMateLoader /> Logging you out...
        </div>
      )}
      {!loading && (
        <div className="flex flex-col justify-center items-center w-full h-screen">
          There might be something wrong while logging you out
          <button onClick={() => push("/login")}>Redirect to Login</button>
        </div>
      )}
    </>
  );
};

export default Logout;
