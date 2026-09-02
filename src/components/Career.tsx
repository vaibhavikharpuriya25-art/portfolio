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
              <h3>2025 - Present</h3>
            </div>
            <p>
              Developed scalable ETL pipelines using Azure Data Factory, Databricks, PySpark, and SQL. Built API-driven ingestion into Azure Data Lake and Power BI dashboards for enterprise analytics.
              <br />
              <br />
              <span className="career-skills-text">
                <strong>Key Skills:</strong> Python, SQL, PySpark, Databricks, ETL, Power BI, LLMs, RAG, Automation
              </span>
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Martian Program Internship</h4>
                <h5>Persistent Systems</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Built hands-on expertise in Python, Machine Learning, Linux, and DBMS. Applied software engineering best practices and problem-solving to real-world data systems.
              <br />
              <br />
              <span className="career-skills-text">
                <strong>Key Skills:</strong> Python, Linux, DBMS, DSA, Machine Learning, PyTorch
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
