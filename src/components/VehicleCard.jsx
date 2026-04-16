export default function VehicleCard({ vehicle }) {
  return (
    <div className="border p-4 rounded shadow bg-white hover:shadow-md transition">
      <h2 className="font-bold text-lg">
        {vehicle.make} {vehicle.model}
      </h2>

      <p className="text-gray-600">Year: {vehicle.year}</p>
    </div>
  );
}
