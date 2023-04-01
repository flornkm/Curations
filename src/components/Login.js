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
      },
      {
        redirectTo: "/admin",
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto grid place-content-center min-h-screen gap-2">
      <p className="font-semibold text-zinc-200">Log in to access this page</p>
      <input
        className="mb-4 py-2 bg-[#0d0d0d] border-zinc-800 border-2 rounded bottom-0 z-10 px-4 focus:outline-none focus:border-transparent transition-all focus:ring-2 focus:ring-zinc-200"
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
          className="px-4 py-2 bg-zinc-800 text-white rounded transition-all hover:bg-zinc-700"
        >
          <span>Send magic link</span>
        </button>
        <button
          className="px-4 py-2 bg-zinc-800 text-white rounded transition-all hover:bg-zinc-700"
          onClick={() => handleGitHubLogin()}
          disabled={loading}
        >
          {loading ? "Logging in" : "Log in with GitHub"}
        </button>
      </div>
    </div>
  );
}
