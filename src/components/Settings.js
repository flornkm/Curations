import { supabase } from '../supabase-config';

export default function Profile({ session }) {
  return (
    <div className='container mx-auto grid place-content-center min-h-screen'>
      <p>Oh hi there {session.user.email}</p>
      <button
        className='mt-4 p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300'
        onClick={() => supabase.auth.signOut()}
      >
        Logout
      </button>
    </div>
  );
}
