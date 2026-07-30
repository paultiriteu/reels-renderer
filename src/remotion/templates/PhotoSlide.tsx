import React from "react";
import { AbsoluteFill } from "remotion";

interface Props {
  headline: string;
  lines: string[];
  slideNumber: number;
  totalSlides: number;
}

// Static (single-frame) template used for photo/carousel rendering.
// Rendered via renderStill, so no useCurrentFrame / animation here.
export const PhotoSlide: React.FC<Props> = ({
  headline,
  lines,
  slideNumber,
  totalSlides,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: "#071510",
        padding: 90,
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      {/* Slide counter */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 90,
          fontSize: 32,
          fontWeight: 800,
          color: "#00FFAA",
          fontFamily: "sans-serif",
          letterSpacing: 2,
        }}
      >
        {slideNumber}/{totalSlides}
      </div>

      {/* Accent bar */}
      <div
        style={{
          width: 120,
          height: 8,
          background: "#00FFAA",
          borderRadius: 4,
          marginBottom: 48,
        }}
      />

      {/* Headline */}
      <div
        style={{
          fontSize: 76,
          fontWeight: 900,
          color: "#00FFAA",
          lineHeight: 1.15,
          marginBottom: 60,
          fontFamily: "sans-serif",
        }}
      >
        {headline}
      </div>

      {/* Lines */}
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#00FFAA",
              marginTop: 18,
              marginRight: 28,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              fontSize: 40,
              color: "#ffffff",
              lineHeight: 1.4,
              fontFamily: "sans-serif",
            }}
          >
            {line}
          </div>
        </div>
      ))}
    </AbsoluteFill>
  );
};
