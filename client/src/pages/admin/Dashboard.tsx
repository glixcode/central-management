import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  console.log({user});
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Welcome, {user?.email}</h2>
          <p className="text-gray-600 mb-4">Role: <span className="font-medium text-blue-600">{user?.role}</span></p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 p-4 rounded border border-blue-100">
              <h3 className="font-bold text-blue-800">Total Residents</h3>
              <p className="text-3xl font-black mt-2 text-blue-600">---</p>
            </div>
            <div className="bg-green-50 p-4 rounded border border-green-100">
              <h3 className="font-bold text-green-800">Pending Requests</h3>
              <p className="text-3xl font-black mt-2 text-green-600">---</p>
            </div>
            <div className="bg-purple-50 p-4 rounded border border-purple-100">
              <h3 className="font-bold text-purple-800">Registered Voters</h3>
              <p className="text-3xl font-black mt-2 text-purple-600">---</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
