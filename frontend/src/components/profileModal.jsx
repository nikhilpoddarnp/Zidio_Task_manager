// components/ProfileModal.jsx
const ProfileModal = ({ user, open, setOpen }) => {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">User Profile</h2>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default ProfileModal;
  