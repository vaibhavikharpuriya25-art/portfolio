import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Engineer</h4>
                <h5>Tata Consultancy Services</h5>
              </div>
              <h3>June 2025 - Present</h3>
            </div>
            <p>
              Developing scalable ETL pipelines using Azure Data Factory, Azure Databricks, PySpark, and SQL.
              Automating L1 operational workflows using AI Agents, LLMs, and RAG.
              Optimizing SQL queries, data ingestion pipelines, and Power BI dashboards.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Testing Training</h4>
                <h5>QSpiders - Software Testing Training Institute</h5>
              </div>
              <h3>Training</h3>
            </div>
            <p>
              Advance Java, Core Java and +2 skills.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Internship</h4>
                <h5>Persistent Systems</h5>
              </div>
              <h3>Jun 2023 - Aug 2023</h3>
            </div>
            <p>
              Built expertise in Python, Machine Learning, Linux, and DBMS through hands-on projects.
              Applied problem-solving and software engineering best practices in real-world scenarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
