"use client";
import { useState } from "react";
import axios from "axios";
import { GitHubProfile, GitHubRepo } from "../types";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";

const Home = () => {
  const [username, setUsername] = useState<string>("");
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchGitHubData = async () => {
    setLoading(true);
    try {
      setError("");
      const profileResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setProfile(profileResponse.data);
      setRepos(reposResponse.data);
    } catch (err) {
      setError("User not found");
      setProfile(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username) {
      fetchGitHubData();
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">
          GitHub Profile Viewer
        </h1>
        <form onSubmit={handleSubmit} className="flex justify-center mb-4">
          <input
            type="text"
            className="border rounded-lg p-2 mr-2 text-red-300"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Search
          </button>
        </form>
        {loading && <Loader />}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {profile && !loading && (
          <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4 mb-4">
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-black"
            />
            <h2 className="text-xl font-semibold text-center mb-2 text-black">
              {profile.name}
            </h2>
            <p className="text-center mb-2 text-black">{profile.bio}</p>
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-500 text-center"
            >
              <button className="relative">
                <span className="text">View Profile</span>
                <span className="blob"></span>
                <span className="blob"></span>
                <span className="blob"></span>
                <span className="blob"></span>
              </button>
            </a>
          </div>
        )}
        {repos.length > 0 && !loading && (
          <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4">
            <h3 className="text-2xl font-semibold mb-2">Repositories</h3>
            <ul className="list-disc list-inside p-5">
              {repos.map((repo) => (
                <li
                  key={repo.id}
                  className="border-black border-2 mb-1 rounded-md"
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {repo.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
