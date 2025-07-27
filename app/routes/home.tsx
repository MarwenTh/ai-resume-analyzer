import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Ai" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Track Your Applications &
              <span className="text-gradient"> Resume Ratings</span>
            </h1>
            <p className="hero-subtitle">
              {!loadingResumes && resumes?.length === 0
                ? "No resumes found. Upload your first resume to get AI-powered feedback and insights."
                : "Review your submissions and check AI-powered feedback to improve your chances."}
            </p>

            {!loadingResumes && resumes?.length === 0 && (
              <div className="hero-cta">
                <Link to="/upload" className="hero-button">
                  <span>Upload Resume</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          <div className="hero-visual">
            <div className="floating-cards">
              <div className="floating-card card-1">
                <div className="card-content">
                  <div className="card-icon">📊</div>
                  <div className="card-text">
                    <h3>AI Analysis</h3>
                    <p>Smart insights</p>
                  </div>
                </div>
              </div>
              <div className="floating-card card-2">
                <div className="card-content">
                  <div className="card-icon">🎯</div>
                  <div className="card-text">
                    <h3>ATS Score</h3>
                    <p>Optimization</p>
                  </div>
                </div>
              </div>
              <div className="floating-card card-3">
                <div className="card-content">
                  <div className="card-icon">💼</div>
                  <div className="card-text">
                    <h3>Job Match</h3>
                    <p>Perfect fit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loadingResumes && (
        <section className="loading-section">
          <div className="loading-container">
            <div className="loading-animation">
              <div className="loading-circle"></div>
              <div className="loading-circle"></div>
              <div className="loading-circle"></div>
            </div>
            <p className="loading-text">Analyzing your resumes...</p>
          </div>
        </section>
      )}

      {/* Resumes Grid */}
      {!loadingResumes && resumes.length > 0 && (
        <section className="resumes-section">
          <div className="section-header">
            <h2 className="section-title">Your Resumes</h2>
            <p className="section-subtitle">
              {resumes.length} resume{resumes.length !== 1 ? "s" : ""} analyzed
            </p>
          </div>

          <div className="resumes-grid">
            {resumes.map((resume, index) => (
              <div
                key={resume.id}
                className="resume-card-wrapper"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ResumeCard resume={resume} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!loadingResumes && resumes?.length === 0 && (
        <section className="empty-section">
          <div className="empty-container">
            <div className="empty-illustration">
              <div className="empty-icon">📄</div>
            </div>
            <h3 className="empty-title">No Resumes Yet</h3>
            <p className="empty-description">
              Start by uploading your first resume to get AI-powered feedback
              and insights.
            </p>
            <Link to="/upload" className="empty-cta">
              <span>Upload Your First Resume</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
