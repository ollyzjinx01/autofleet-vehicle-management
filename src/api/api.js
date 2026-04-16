import { mockVehicles } from "./mockVehicles";

// simulate API delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const fetchVehicles = async () => {
  await delay(800); // simulate network request
  return mockVehicles;
};