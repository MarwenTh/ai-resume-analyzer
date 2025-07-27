import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [imagePath]);

  return (
    <Link to={`/resume/${id}`} className="resume-card-modern group">
      <div className="card-header">
        <div className="card-info">
          {companyName && <h3 className="company-name">{companyName}</h3>}
          {jobTitle && <p className="job-title">{jobTitle}</p>}
          {!companyName && !jobTitle && (
            <h3 className="company-name">Resume</h3>
          )}
        </div>
        <div className="score-container">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {resumeUrl && (
        <div className="resume-preview">
          <div className="preview-container">
            <img
              src={resumeUrl}
              alt="resume preview"
              className="preview-image"
            />
            <div className="preview-overlay">
              <div className="overlay-content">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="text-white font-medium">View Details</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card-footer">
        <div className="score-details">
          <span className="score-label">Overall Score</span>
          <span className="score-value">{feedback.overallScore}%</span>
        </div>
        <div className="view-button">
          <span>View Analysis</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
