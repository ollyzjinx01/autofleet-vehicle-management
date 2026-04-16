import { useState } from "react";
import { useVehicleStore } from "../store/useVehicleStore";
import { Link } from "react-router-dom";
import React from "react";
import { notifySuccess, notifyError } from "../utils/notifications"; // ⭐ ADDED
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema } from "../validation/vehicleSchema";

export default function Vehicles() {
  const {
    vehicles,
    addVehicle,
    deleteVehicle,
    updateVehicle,
    services,
    addService,
    deleteService,
  } = useVehicleStore();

  const [editId, setEditId] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("regular");

  const [serviceEditId, setServiceEditId] = useState(null);

  // =========================
  // FORM VALIDATION
  // =========================
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vehicleSchema),
  });

  // =========================
  // VEHICLE FUNCTIONS
  // =========================
  const onSubmit = (data) => {
    if (editId) {
      updateVehicle(editId, data);
      notifySuccess("Vehicle updated successfully"); // ⭐ ADDED
      setEditId(null);
    } else {
      addVehicle(data);
      notifySuccess("Vehicle added successfully"); // ⭐ ADDED
    }

    reset();
  };

  const handleEdit = (vehicle) => {
    setEditId(vehicle.id);
    reset(vehicle);
  };

  const handleCancel = () => {
    setEditId(null);
    reset();
  };

  const handleDeleteVehicle = (id) => {
    deleteVehicle(id);
    notifySuccess("Vehicle deleted"); // ⭐ ADDED
  };

  // =========================
  // SERVICE FUNCTIONS
  // =========================
  const handleServiceSubmit = (e, vehicleId) => {
    e.preventDefault();

    if (!desc || !price) {
      notifyError("Fill all service fields"); // ⭐ ADDED
      return;
    }

    if (serviceEditId) {
      const updatedList = services[vehicleId].map((s) =>
        s.id === serviceEditId ? { ...s, desc, price, type } : s,
      );

      useVehicleStore.setState((state) => ({
        services: {
          ...state.services,
          [vehicleId]: updatedList,
        },
      }));

      notifySuccess("Service updated"); // ⭐ ADDED
      setServiceEditId(null);
    } else {
      addService(vehicleId, {
        desc,
        price,
        type,
        date: new Date().toLocaleDateString(),
      });

      notifySuccess("Service added"); // ⭐ ADDED
    }

    setDesc("");
    setPrice("");
    setType("regular");
  };

  // ⭐ ADDED (missing in your original code)
  const handleServiceEdit = (service) => {
    setServiceEditId(service.id);
    setDesc(service.desc);
    setPrice(service.price);
    setType(service.type);
  };

  const handleServiceDelete = (vehicleId, serviceId) => {
    deleteService(vehicleId, serviceId);
    notifySuccess("Service deleted"); // ⭐ ADDED
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vehicles</h1>

        <Link to="/" className="text-blue-600 underline">
          ← Back to Dashboard
        </Link>
      </div>

      {/* VEHICLE FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 max-w-md">
        <input
          className="border p-2 w-full"
          placeholder="Make"
          {...register("make")}
        />
        {errors.make && (
          <p className="text-red-500 text-sm">{errors.make.message}</p>
        )}

        <input
          className="border p-2 w-full"
          placeholder="Model"
          {...register("model")}
        />
        {errors.model && (
          <p className="text-red-500 text-sm">{errors.model.message}</p>
        )}

        <input
          className="border p-2 w-full"
          placeholder="Year"
          {...register("year")}
        />
        {errors.year && (
          <p className="text-red-500 text-sm">{errors.year.message}</p>
        )}

        <div className="flex gap-2">
          <button className="bg-green-500 text-white px-4 py-2">
            {editId ? "Update Vehicle" : "Add Vehicle"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Make</th>
              <th className="p-2 border">Model</th>
              <th className="p-2 border">Year</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  <div className="text-center py-10 text-gray-500">
                    🚗 No vehicles found yet
                    <p className="text-sm mt-1">
                      Start by adding your first vehicle above
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              vehicles.map((v) => (
                <React.Fragment key={v.id}>
                  <tr className="border-t">
                    <td className="p-2 border">{v.make}</td>
                    <td className="p-2 border">{v.model}</td>
                    <td className="p-2 border">{v.year}</td>

                    <td className="p-2 border">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleEdit(v)}
                          className="bg-yellow-500 text-white px-3 py-1 text-sm">
                          Edit
                        </button>

                        {/* ⭐ CHANGED */}
                        <button
                          onClick={() => handleDeleteVehicle(v.id)}
                          className="bg-red-500 text-white px-3 py-1 text-sm">
                          Delete
                        </button>

                        <button
                          onClick={() =>
                            setSelectedVehicle(
                              selectedVehicle === v.id ? null : v.id,
                            )
                          }
                          className="bg-blue-500 text-white px-3 py-1 text-sm">
                          {selectedVehicle === v.id
                            ? "Hide"
                            : "Register Service"}{" "}
                          {/* ⭐ CHANGED */}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* SERVICES */}
                  {selectedVehicle === v.id && (
                    <tr>
                      <td colSpan="4" className="bg-gray-50 p-4">
                        <h2 className="font-bold mb-2">
                          Service Records ({v.make} {v.model})
                        </h2>

                        <form
                          onSubmit={(e) => handleServiceSubmit(e, v.id)}
                          className="space-y-2 max-w-md">
                          <input
                            className="border p-2 w-full"
                            placeholder="Description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                          />

                          <input
                            className="border p-2 w-full"
                            placeholder="Price (€)"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />

                          <select
                            className="border p-2 w-full"
                            value={type}
                            onChange={(e) => setType(e.target.value)}>
                            <option value="regular">Regular</option>
                            <option value="repair">Repair</option>
                          </select>

                          <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2">
                            {serviceEditId ? "Update Service" : "Add Service"}
                          </button>
                        </form>

                        {/* LIST */}
                        <div className="mt-4 space-y-2">
                          {services[v.id]?.length ? (
                            services[v.id].map((s) => (
                              <div
                                key={s.id}
                                className="border p-2 flex justify-between bg-white">
                                <div>
                                  <p className="font-medium">{s.desc}</p>
                                  <p className="text-sm text-gray-500">
                                    {s.type} | €{s.price} | {s.date}
                                  </p>
                                </div>

                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleServiceEdit(s)}
                                    className="bg-yellow-500 text-white px-2 py-1 text-sm">
                                    Edit
                                  </button>

                                  {/* ⭐ CHANGED */}
                                  <button
                                    onClick={() =>
                                      handleServiceDelete(v.id, s.id)
                                    }
                                    className="bg-red-500 text-white px-2 py-1 text-sm">
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm mt-2">
                              No services yet
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
