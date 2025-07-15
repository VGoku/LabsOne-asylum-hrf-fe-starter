/**
 * TODO: Ticket 3:
 * Implement authentication using Auth0:
 * - Get the user data from Auth0
 * - Create and style the component
 * - Display the data
 * - Make this page a protected Route
 */
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  // TODO: Replace these with functionality from Auth0
  // const isLoading = false;
  // const user = true;
  const { user, isAuthenticated, isLoading } = useAuth0();

  // if (isLoading || !user) {
  //   return <div className='text-center p-4'>Loading...</div>;
  // }
  if (isLoading) {
    return <div className="text-center p-4 text-gray-600">Loading profile...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-center p-4 text-gray-600">Please log in to view your profile.</div>;
  }

//   return (
//     <div>
//       <h2 className="text-lg font-semibold">Profile Information</h2>
//       <pre className="whitespace-pre-wrap">{JSON.stringify(user, null, 2)}</pre>
//     </div>
//   );
// };

return (
    <div className="max-w-3xl mx-auto p-6 font-sans text-center text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <img
        src={user.picture}
        alt="User profile"
        className="rounded-full w-24 h-24 mx-auto mb-4 shadow-md"
      />
      <p className="text-base mb-2">
        <strong>Email:</strong> {user.email}
      </p>
      {user.nickname && (
        <p className="text-base mb-2">
          <strong>Username:</strong> {user.nickname}
        </p>
      )}
      {user.updated_at && (
        <p className="text-sm text-gray-500">
          Last updated: {new Date(user.updated_at).toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default Profile;
