import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

interface Props {
  hook: string;
  points: string[];
  cta: string;
}

export const CountdownReveal: React.FC<Props> = ({ hook, points, cta }) => {
  const frame = useCurrentFrame();
  const hookOpacity = interpolate(frame, [0, 20], [0, 1]);

  return (
    <AbsoluteFill style={{ background: "#0F0A1E", padding: 80, flexDirection: "column", justifyContent: "center" }}>
      <div style={{ opacity: hookOpacity, fontSize: 64, fontWeight: 900, color: "#ffffff", lineHeight: 1.2, marginBottom: 80, fontFamily: "sans-serif", textAlign: "center" }}>
        {hook}
      </div>
      {points.map((point, i) => {
        const number = points.length - i;
        const delay = 30 + i * 40;
        const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const scale = interpolate(frame, [delay, delay + 20], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={i} style={{ opacity, transform: `scale(${scale})`, display: "flex", alignItems: "center", gap: 32, marginBottom: 48 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#A78BFA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, color: "#ffffff", fontFamily: "sans-serif", flexShrink: 0 }}>
              {number}
            </div>
            <div style={{ fontSize: 36, color: "#ffffff", fontFamily: "sans-serif", lineHeight: 1.4, flex: 1 }}>
              {point}
            </div>
          </div>
        );
      })}
      {frame > 140 && (
        <div style={{ background: "#A78BFA", color: "#ffffff", padding: "20px 40px", borderRadius: 60, fontWeight: 800, fontSize: 36, fontFamily: "sans-serif", textAlign: "center", marginTop: 20 }}>
          {cta}
        </div>
      )}
    </AbsoluteFill>
  );
};
