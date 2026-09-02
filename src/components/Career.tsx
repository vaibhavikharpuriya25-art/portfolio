import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Engineer</h4>
                <h5>TCS (Tata Consultancy Services) | Software | IT | Mumbai</h5>
              </div>
              <h3>June 2025 - Present</h3>
            </div>
            <p>
              Developed scalable ETL pipelines using Azure Data Factory, Azure Databricks, PySpark, and SQL.<br />
              Built API-driven ingestion pipelines integrating logistics platform data into Azure Data Lake.<br />
              Optimized SQL queries and Spark transformations to improve execution performance.<br />
              Developed Power BI dashboards supporting operational reporting and business analytics.<br />
              Automated workflow scheduling and monitoring to improve production reliability.<br />
              Worked closely with logistics stakeholders to support enterprise reporting and analytics.
            </p>
            <div className="career-skills" style={{ marginTop: "12px", opacity: 0.9, fontSize: "0.9rem" }}>
              <strong>Key Skills:</strong> Python, SQL, PySpark, Databricks, ETL, Data Engineering, Data Integration, Power BI, RAG, LLMs, ChromaDB, Vector Embeddings, REST APIs, GPU, Automation
            </div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Martian Program Internship</h4>
                <h5>Persistent System Ltd. | IT / Computers - Software | Pune</h5>
              </div>
              <h3>August 2023 (2 Months)</h3>
            </div>
            <p>
              Built expertise in Python, Machine Learning, Linux, and DBMS through hands-on projects.<br />
              Applied problem-solving and software engineering best practices in real-world scenarios.
            </p>
            <div className="career-skills" style={{ marginTop: "12px", opacity: 0.9, fontSize: "0.9rem" }}>
              <strong>Key Skills:</strong> Linux, DBMS, DSA, Python, Machine Learning, PyTorch
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
