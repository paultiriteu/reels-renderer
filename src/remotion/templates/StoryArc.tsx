import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

interface Props {
  hook: string;
  points: string[];
  cta: string;
}

export const StoryArc: React.FC<Props> = ({ hook, points, cta }) => {
  const frame = useCurrentFrame();

  const hookOpacity = interpolate(frame, [0, 20], [0, 1]);

  const stages = ["Problema", "Realitatea", "Soluția"];
  const stageColors = ["#FF4D4D", "#FFD700", "#00E096"];

  return (
    <AbsoluteFill
      style={{
        background: "#0E0900",
        padding: 80,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Hook */}
      <div
        style={{
          opacity: hookOpacity,
          fontSize: 60,
          fontWeight: 900,
          color: "#FFD700",
          lineHeight: 1.2,
          marginBottom: 80,
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        {hook}
      </div>

      {/* Story stages */}
      {points.map((point, i) => {
        const delay = 30 + i * 45;
        const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const x = interpolate(frame, [delay, delay + 20], [-60, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `translateX(${x}px)`,
              marginBottom: 48,
              padding: "28px 36px",
              background: stageColors[i] + "18",
              borderLeft: `6px solid ${stageColors[i]}`,
              borderRadius: 12,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: stageColors[i],
                marginBottom: 10,
                fontFamily: "sans-serif",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {stages[i]}
            </div>
            <div
              style={{
                fontSize: 36,
                color: "#ffffff",
                fontFamily: "sans-serif",
                lineHeight: 1.4,
              }}
            >
              {point}
            </div>
          </div>
        );
      })}

      {/* CTA */}
      {frame > 150 && (
        <div
          style={{
            background: "#FFD700",
            color: "#0E0900",
            padding: "20px 40px",
            borderRadius: 60,
            fontWeight: 800,
            fontSize: 36,
            fontFamily: "sans-serif",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {cta}
        </div>
      )}
    </AbsoluteFill>
  );
};
