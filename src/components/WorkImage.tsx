import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
  fallback?: boolean;
  category?: string;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  "Machine Learning": "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #1a0533 100%)",
  "ML & Data Analysis": "linear-gradient(135deg, #0d2137 0%, #1a4d6e 50%, #0d2137 100%)",
  "NLP / Machine Learning": "linear-gradient(135deg, #1a0a00 0%, #6b2d00 50%, #1a0a00 100%)",
  "DevOps & Cloud": "linear-gradient(135deg, #001a1a 0%, #0d4d4d 50%, #001a1a 100%)",
  "Web Development": "linear-gradient(135deg, #0a001a 0%, #3d0d6b 50%, #0a001a 100%)",
};

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const [imgError, setImgError] = useState(false);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const gradient = CATEGORY_GRADIENTS[props.category || ""] ||
    "linear-gradient(135deg, #0d1117 0%, #2d1b69 100%)";

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        {(imgError || props.fallback) ? (
          <div className="work-image-fallback" style={{ background: gradient }}>
            <span className="work-image-fallback-text">{props.alt}</span>
            <span className="work-image-fallback-category">{props.category}</span>
          </div>
        ) : (
          <img
            src={props.image}
            alt={props.alt}
            onError={() => setImgError(true)}
          />
        )}
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;
