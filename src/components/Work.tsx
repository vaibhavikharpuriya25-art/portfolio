import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BASE = import.meta.env.BASE_URL;

const projects = [
  {
    title: "AI Infrastructure Monitoring Agent",
    category: "AI & Monitoring",
    tools: "Python, LangGraph, LLMs, RAG, ChromaDB, Docker, Kubernetes, SQL",
    image: `${BASE}images/ai_monitoring.png`,
    fallback: false,
  },
  {
    title: "Enterprise Logistics Data Platform",
    category: "Data Engineering",
    tools: "Azure Databricks, ETL, REST APIs, PostgreSQL, Terraform",
    image: `${BASE}images/logistics_platform.png`,
    fallback: false,
  },
  {
    title: "Enterprise Retail & ERP Data Platform",
    category: "Data Engineering",
    tools: "Azure Databricks, Delta Lake, Microsoft Synapse Link",
    image: `${BASE}images/retail_erp.png`,
    fallback: false,
  },
  {
    title: "Enterprise Trading Analytics Platform",
    category: "Analytics & BI",
    tools: "Power BI, SQL, Data Modeling",
    image: `${BASE}images/trading_analytics.png`,
    fallback: false,
  },
  {
    title: "AI-Powered Operations Automation",
    category: "AI & Data Engineering",
    tools: "Python, LLMs, RAG, Databricks, PySpark, SQL",
    image: `${BASE}images/ai_automation.png`,
    fallback: false,
  },
  {
    title: "AI Crop Disease Detector (SIH)",
    category: "Machine Learning",
    tools: "Python, CNN, Image Processing",
    image: `${BASE}images/crop_disease.png`,
    fallback: false,
  },
];


const Work = () => {
  useGSAP(() => {
    // On mobile, cards are stacked vertically — no horizontal scroll needed
    if (window.innerWidth <= 900) return;

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (!box || box.length === 0) return 0;

      const workContainer = document.querySelector(".work-container");
      if (!workContainer) return 0;

      const rectLeft = workContainer.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentElement = box[0].parentElement;
      if (!parentElement) return 0;

      const parentWidth = parentElement.getBoundingClientRect().width;
      const style = window.getComputedStyle(box[0]);
      let padding: number = parseInt(style.padding || "0") / 2;

      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
      return translateX;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${setTranslateX()}`,
        scrub: true,
        pin: true,
        pinType: "transform",
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: () => -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                category={project.category}
                fallback={(project as any).fallback}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
