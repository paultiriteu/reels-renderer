import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

interface Props {
  hook: string;
  points: string[];
  cta: string;
}

export const QuoteCard: React.FC<Props> = ({ hook, points, cta }) => {
  const frame = useCurrentFrame();
  const hookOpacity = interpolate(frame, [0, 25], [0, 1]);
  const hookScale = interpolate(frame, [0, 25], [0.8, 1], { extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [20, 60], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#071510", padding: 80, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: `${lineWidth}%`, height: 4, background: "#00FFAA", marginBottom: 60, borderRadius: 2 }} />
      <div style={{ opacity: hookOpacity, transform: `scale(${hookScale})`, fontSize: 72, fontWeight: 900, color: "#00FFAA", textAlign: "center", fontFamily: "sans-serif", lineHeight: 1.2, marginBottom: 60 }}>
        {hook}
      </div>
      <div style={{ width: `${lineWidth}%`, height: 4, background: "#00FFAA", marginBottom: 80, borderRadius: 2 }} />
      {points.map((point, i) => {
        const delay = 60 + i * 25;
        const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={i} style={{ opacity, fontSize: 34, color: "#ffffff", textAlign: "center", fontFamily: "sans-serif", lineHeight: 1.5, marginBottom: 24, paddingLeft: 20, paddingRight: 20 }}>
            {point}
          </div>
        );
      })}
      {frame > 140 && (
        <div style={{ position: "absolute", bottom: 100, background: "#00FFAA", color: "#071510", padding: "20px 48px", borderRadius: 60, fontWeight: 800, fontSize: 36, fontFamily: "sans-serif" }}>
          {cta}
        </div>
      )}
    </AbsoluteFill>
  );
};
