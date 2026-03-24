"use client";



export default function MyProfile() {
  const { user } = useAuth();

  if (!user) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">My Profile</h1>

      <div className="space-y-4 bg-white shadow p-6 rounded-xl">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>

        {/* client extra data */}
        <p>
          <strong>Phone:</strong>{" "}
          {user?.client?.contactNumber || "N/A"}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {user?.client?.address || "N/A"}
        </p>
      </div>
    </div>
  );
}