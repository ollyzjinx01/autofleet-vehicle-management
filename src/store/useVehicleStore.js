import { create } from "zustand";

export const useVehicleStore = create((set) => ({
  vehicles: [],

  services: {},
  // VEHICLES
  addVehicle: (vehicle) =>
    set((state) => ({
      vehicles: [...state.vehicles, { ...vehicle, id: Date.now().toString() }],
    })),

  updateVehicle: (id, updatedData) =>
    set((state) => ({
      vehicles: state.vehicles.map((v) =>
        v.id === id ? { ...v, ...updatedData } : v,
      ),
    })),

  deleteVehicle: (id) =>
    set((state) => {
      const newVehicles = state.vehicles.filter((v) => v.id !== id);
      const newServices = { ...state.services };
      delete newServices[id]; // remove related services

      return {
        vehicles: newVehicles,
        services: newServices,
      };
    }),

  // SERVICES
  addService: (vehicleId, service) =>
    set((state) => {
      const vehicleServices = state.services[vehicleId] || [];

      return {
        services: {
          ...state.services,
          [vehicleId]: [
            ...vehicleServices,
            {
              ...service,
              id: Date.now().toString(),
            },
          ],
        },
      };
    }),

  deleteService: (vehicleId, serviceId) =>
    set((state) => {
      const vehicleServices = state.services[vehicleId] || [];

      return {
        services: {
          ...state.services,
          [vehicleId]: vehicleServices.filter((s) => s.id !== serviceId),
        },
      };
    }),
}));
