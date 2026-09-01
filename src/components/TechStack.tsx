import * as THREE from "three";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
  CuboidCollider,
} from "@react-three/rapier";

// ─── Logo Drawers ────────────────────────────────────────────────────────────
type DrawFn = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) => void;

const drawKubernetes: DrawFn = (ctx, cx, cy, r) => {
  const s = r * 0.55;
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = r * 0.07;
  ctx.beginPath();
  ctx.arc(cx, cy, s * 0.85, 0, Math.PI * 2);
  ctx.stroke();
  const spokes = 7;
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * s * 0.85, cy + Math.sin(a) * s * 0.85);
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * s * 0.55, cy + Math.sin(a) * s * 0.55, r * 0.07, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.1, 0, Math.PI * 2);
  ctx.fill();
};

const drawDocker: DrawFn = (ctx, cx, cy, r) => {
  const s = r * 0.045;
  ctx.fillStyle = "#fff";
  // whale body
  const cols = 3, rows = 3;
  const gap = s * 2.6;
  const bw = s * 2.2, bh = s * 1.8;
  const startX = cx - (cols - 1) * gap * 0.5;
  const startY = cy - s * 4;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (row === 0 && col === 0) continue;
      const bx = startX + col * gap - bw / 2;
      const by = startY + row * gap - bh / 2;
      ctx.fillRect(bx, by, bw, bh);
    }
  }
  // container ship / underline
  const shipY = startY + rows * gap - bh * 0.5;
  ctx.fillRect(cx - r * 0.5, shipY, r, s * 1.8);
  // whale tail
  ctx.beginPath();
  ctx.moveTo(cx + r * 0.52, shipY + s * 0.9);
  ctx.lineTo(cx + r * 0.8, shipY - s * 1.5);
  ctx.lineTo(cx + r * 0.65, shipY + s * 0.9);
  ctx.fill();
};

const drawAnsible: DrawFn = (ctx, cx, cy, r) => {
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = r * 0.1;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${r * 0.75}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("A", cx + r * 0.06, cy + r * 0.05);
};

const drawJenkins: DrawFn = (ctx, cx, cy, r) => {
  ctx.fillStyle = "#fff";
  // head
  ctx.beginPath();
  ctx.arc(cx, cy - r * 0.1, r * 0.45, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#D24939";
  // eyes
  ctx.beginPath();
  ctx.arc(cx - r * 0.14, cy - r * 0.15, r * 0.06, 0, Math.PI * 2);
  ctx.arc(cx + r * 0.14, cy - r * 0.15, r * 0.06, 0, Math.PI * 2);
  ctx.fill();
  // smile
  ctx.strokeStyle = "#D24939";
  ctx.lineWidth = r * 0.05;
  ctx.beginPath();
  ctx.arc(cx, cy - r * 0.06, r * 0.18, 0.2, Math.PI - 0.2);
  ctx.stroke();
  // hair tufts
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = r * 0.06;
  ctx.beginPath();
  ctx.moveTo(cx - r * 0.2, cy - r * 0.5);
  ctx.lineTo(cx - r * 0.25, cy - r * 0.7);
  ctx.moveTo(cx + r * 0.2, cy - r * 0.5);
  ctx.lineTo(cx + r * 0.25, cy - r * 0.7);
  ctx.stroke();
};

const drawLinux: DrawFn = (ctx, cx, cy, r) => {
  ctx.fillStyle = "#111";
  // body
  ctx.beginPath();
  ctx.ellipse(cx, cy + r * 0.05, r * 0.32, r * 0.42, 0, 0, Math.PI * 2);
  ctx.fill();
  // head
  ctx.beginPath();
  ctx.ellipse(cx, cy - r * 0.32, r * 0.28, r * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();
  // ears
  ctx.beginPath();
  ctx.ellipse(cx - r * 0.22, cy - r * 0.52, r * 0.09, r * 0.15, -0.4, 0, Math.PI * 2);
  ctx.ellipse(cx + r * 0.22, cy - r * 0.52, r * 0.09, r * 0.15, 0.4, 0, Math.PI * 2);
  ctx.fill();
  // eyes
  ctx.fillStyle = "#FFD133";
  ctx.beginPath();
  ctx.arc(cx - r * 0.1, cy - r * 0.32, r * 0.055, 0, Math.PI * 2);
  ctx.arc(cx + r * 0.1, cy - r * 0.32, r * 0.055, 0, Math.PI * 2);
  ctx.fill();
};

const drawBash: DrawFn = (ctx, cx, cy, r) => {
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${r * 0.38}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("$_", cx, cy - r * 0.05);
  ctx.font = `${r * 0.18}px monospace`;
  ctx.fillText("#!/bin/bash", cx, cy + r * 0.32);
};

const drawAWS: DrawFn = (ctx, cx, cy, r) => {
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${r * 0.32}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("aws", cx, cy - r * 0.12);
  // smile arrow
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = r * 0.08;
  ctx.beginPath();
  ctx.arc(cx, cy + r * 0.08, r * 0.36, 0.15, Math.PI - 0.15);
  ctx.stroke();
  // arrowhead
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(cx + r * 0.36, cy + r * 0.18);
  ctx.lineTo(cx + r * 0.48, cy + r * 0.08);
  ctx.lineTo(cx + r * 0.38, cy - r * 0.02);
  ctx.fill();
};

const drawPython: DrawFn = (ctx, cx, cy, r) => {
  const s = r * 0.28;
  // Blue snake head (top)
  ctx.fillStyle = "#FFD43B";
  ctx.beginPath();
  ctx.roundRect(cx - s * 0.9, cy - r * 0.55, s * 1.8, s * 1.8, s * 0.4);
  ctx.fill();
  // Yellow snake body (bottom)
  ctx.fillStyle = "#3776AB";
  ctx.beginPath();
  ctx.roundRect(cx - s * 0.9, cy + r * 0.05, s * 1.8, s * 1.8, s * 0.4);
  ctx.fill();
  // connector dots
  ctx.fillStyle = "#FFD43B";
  ctx.beginPath();
  ctx.arc(cx + s * 0.38, cy - r * 0.05, s * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#3776AB";
  ctx.beginPath();
  ctx.arc(cx - s * 0.38, cy + r * 0.14, s * 0.22, 0, Math.PI * 2);
  ctx.fill();
};

const drawAIML: DrawFn = (ctx, cx, cy, r) => {
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = r * 0.05;
  // neural net nodes
  const nodes = [
    [cx - r * 0.45, cy - r * 0.3],
    [cx - r * 0.45, cy + r * 0.3],
    [cx, cy - r * 0.45],
    [cx, cy],
    [cx, cy + r * 0.45],
    [cx + r * 0.45, cy - r * 0.3],
    [cx + r * 0.45, cy + r * 0.3],
  ];
  const connections = [[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,5],[3,5],[3,6],[4,6]];
  connections.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0], nodes[a][1]);
    ctx.lineTo(nodes[b][0], nodes[b][1]);
    ctx.stroke();
  });
  nodes.forEach(([nx, ny]) => {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(nx, ny, r * 0.07, 0, Math.PI * 2);
    ctx.fill();
  });
};

const drawMySQL: DrawFn = (ctx, cx, cy, r) => {
  ctx.fillStyle = "#fff";
  // cylinder top ellipse
  ctx.beginPath();
  ctx.ellipse(cx, cy - r * 0.28, r * 0.42, r * 0.14, 0, 0, Math.PI * 2);
  ctx.fill();
  // cylinder body
  ctx.fillRect(cx - r * 0.42, cy - r * 0.28, r * 0.84, r * 0.55);
  // cylinder bottom
  ctx.beginPath();
  ctx.ellipse(cx, cy + r * 0.27, r * 0.42, r * 0.14, 0, 0, Math.PI * 2);
  ctx.fill();
  // middle line
  ctx.fillStyle = "#00758F";
  ctx.beginPath();
  ctx.ellipse(cx, cy + r * 0.0, r * 0.42, r * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();
  // dolphin tail hint
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${r * 0.18}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#00758F";
  ctx.fillText("SQL", cx, cy + r * 0.02);
};

const drawJSON: DrawFn = (ctx, cx, cy, r) => {
  ctx.fillStyle = "#F1C40F";
  ctx.font = `bold ${r * 0.36}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("{  }", cx, cy - r * 0.15);
  ctx.font = `${r * 0.18}px monospace`;
  ctx.fillText('"key": value', cx, cy + r * 0.22);
};

const drawTerraform: DrawFn = (ctx, cx, cy, r) => {
  ctx.fillStyle = "#fff";
  // diamond / rhombus shape made of 4 triangles
  const top = [cx, cy - r * 0.6];
  const right = [cx + r * 0.5, cy];
  const bottom = [cx, cy + r * 0.6];
  const left = [cx - r * 0.5, cy];
  const mid = [cx, cy];
  // top-right
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(...(top as [number,number]));
  ctx.lineTo(...(right as [number,number]));
  ctx.lineTo(...(mid as [number,number]));
  ctx.closePath();
  ctx.fill();
  // bottom-right
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.beginPath();
  ctx.moveTo(...(right as [number,number]));
  ctx.lineTo(...(bottom as [number,number]));
  ctx.lineTo(...(mid as [number,number]));
  ctx.closePath();
  ctx.fill();
  // top-left
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath();
  ctx.moveTo(...(top as [number,number]));
  ctx.lineTo(...(left as [number,number]));
  ctx.lineTo(...(mid as [number,number]));
  ctx.closePath();
  ctx.fill();
  // bottom-left
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.beginPath();
  ctx.moveTo(...(left as [number,number]));
  ctx.lineTo(...(bottom as [number,number]));
  ctx.lineTo(...(mid as [number,number]));
  ctx.closePath();
  ctx.fill();
};

const drawCICD: DrawFn = (ctx, cx, cy, r) => {
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = r * 0.07;
  // circular arrows
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.45, 0.3, Math.PI - 0.3);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.45, Math.PI + 0.3, Math.PI * 2 - 0.3);
  ctx.stroke();
  // arrowheads
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(cx + r * 0.38, cy - r * 0.26);
  ctx.lineTo(cx + r * 0.52, cy - r * 0.1);
  ctx.lineTo(cx + r * 0.28, cy - r * 0.1);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx - r * 0.38, cy + r * 0.26);
  ctx.lineTo(cx - r * 0.52, cy + r * 0.1);
  ctx.lineTo(cx - r * 0.28, cy + r * 0.1);
  ctx.fill();
};

// ─── Tech definitions ─────────────────────────────────────────────────────────
const technologies = [
  { name: "CI/CD",       bgColor: "#E24A29", draw: drawCICD },
  { name: "Kubernetes",  bgColor: "#326CE5", draw: drawKubernetes },
  { name: "Docker",      bgColor: "#2496ED", draw: drawDocker },
  { name: "Ansible",     bgColor: "#1A1A1A", draw: drawAnsible },
  { name: "Jenkins",     bgColor: "#D24939", draw: drawJenkins },
  { name: "Linux",       bgColor: "#FFD133", draw: drawLinux },
  { name: "Bash",        bgColor: "#1D4D10", draw: drawBash },
  { name: "AWS",         bgColor: "#232F3E", draw: drawAWS },
  { name: "Python",      bgColor: "#1e3a5f", draw: drawPython },
  { name: "AI / ML",     bgColor: "#5B21B6", draw: drawAIML },
  { name: "MySQL",       bgColor: "#00758F", draw: drawMySQL },
  { name: "JSON",        bgColor: "#2F2F2F", draw: drawJSON },
  { name: "Terraform",   bgColor: "#7B42BC", draw: drawTerraform },
];

// ─── Texture factory ──────────────────────────────────────────────────────────
const createTechTexture = (tech: typeof technologies[0]) => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  const cx = 256, cy = 256, r = 230;

  // Background circle
  ctx.fillStyle = tech.bgColor;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Glossy highlight
  const grd = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, 0, cx, cy, r);
  grd.addColorStop(0, "rgba(255,255,255,0.22)");
  grd.addColorStop(0.5, "rgba(255,255,255,0)");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Outer ring
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 8, 0, Math.PI * 2);
  ctx.stroke();

  // Draw logo
  tech.draw(ctx, cx, cy, r);

  // Label at bottom
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = `bold 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(tech.name, cx, cy + r * 0.72);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

// ─── Sphere pool: each tech appears ~2-3 times, total 30 ─────────────────────
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// Build an index list: each tech index appears at least twice
const buildSphereList = () => {
  const list: number[] = [];
  technologies.forEach((_, i) => { list.push(i, i); }); // 26 entries (13×2)
  // Fill remaining 4 slots cycling through
  for (let i = 0; list.length < 30; i++) {
    list.push(i % technologies.length);
  }
  // Shuffle
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};

const spheres = buildSphereList().map((techIndex) => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
  techIndex,
}));

// ─── Components ───────────────────────────────────────────────────────────────
type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );
    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20), r(20)]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3() }: { vec?: THREE.Vector3 }) {
  const ref = useRef<RapierRigidBody>(null);
  useFrame(({ pointer, viewport }) => {
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });
  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

function Bounds() {
  const w = 25; // width
  const h = 30; // height
  const d = 15; // depth
  const t = 5;  // wall thickness
  return (
    <RigidBody type="fixed" colliders={false}>
      {/* Floor */}
      <CuboidCollider position={[0, -h, 0]} args={[w, t, d]} />
      {/* Ceiling */}
      <CuboidCollider position={[0, h, 0]} args={[w, t, d]} />
      {/* Left Wall */}
      <CuboidCollider position={[-w, 0, 0]} args={[t, h, d]} />
      {/* Right Wall */}
      <CuboidCollider position={[w, 0, 0]} args={[t, h, d]} />
      {/* Back Wall */}
      <CuboidCollider position={[0, 0, -d]} args={[w, h, t]} />
      {/* Front Wall */}
      <CuboidCollider position={[0, 0, d]} args={[w, h, t]} />
    </RigidBody>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const TechStack = () => {
  // One material per tech (stable, not recreated)
  const materials = useMemo(() => {
    return technologies.map((tech) => {
      const texture = createTechTexture(tech);
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: "#ffffff",
        emissiveMap: texture,
        emissiveIntensity: 0.12,
        metalness: 0.35,
        roughness: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
      });
    });
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>
      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Bounds />
          <Pointer />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              scale={props.scale}
              material={materials[props.techIndex]}
            />
          ))}
        </Physics>
        <Environment
          files={`${import.meta.env.BASE_URL}models/char_enviorment.hdr`}
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
