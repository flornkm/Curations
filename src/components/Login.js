import { useState } from "react";
import { supabase } from "../supabase-config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email) => {
    try {
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({
        provider: "github",
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto grid place-content-center min-h-screen">
      <p className="mb-4">Log in to access this page</p>
      <input
        className="rounded-md mb-8 py-2 ring-1 ring-zinc-600 bg-zinc-700 bottom-0 z-10 px-4 focus:outline-none transition-all focus:ring-1 focus:ring-red-500"
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex flex-col gap-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogin(email);
          }}
          className="px-4 py-2 bg-zinc-700 text-white rounded-md transition-all hover:bg-zinc-600"
        >
          <span>Send magic link</span>
        </button>
        <button
          className="px-4 py-2 bg-zinc-700 text-white rounded-md transition-all hover:bg-zinc-600"
          onClick={() => handleGitHubLogin()}
          disabled={loading}
        >
          {loading ? "Logging in" : "Login with GitHub"}
        </button>
      </div>
    </div>
  );
}
