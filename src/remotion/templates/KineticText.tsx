import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

interface Props {
  hook: string;
  points: string[];
  cta: string;
}

export const KineticText: React.FC<Props> = ({ hook, points, cta }) => {
  const frame = useCurrentFrame();

  const hookOpacity = interpolate(frame, [0, 20], [0, 1]);
  const hookY = interpolate(frame, [0, 20], [40, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0D0D0D",
        padding: 80,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          opacity: hookOpacity,
          transform: `translateY(${hookY}px)`,
          fontSize: 72,
          fontWeight: 900,
          color: "#C8FF00",
          lineHeight: 1.1,
          marginBottom: 60,
          fontFamily: "sans-serif",
        }}
      >
        {hook}
      </div>

      {points.map((point, i) => {
        const delay = 30 + i * 25;
        const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(frame, [delay, delay + 15], [20, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `translateY(${y}px)`,
              fontSize: 38,
              color: "#ffffff",
              marginBottom: 32,
              paddingLeft: 32,
              borderLeft: "4px solid #C8FF00",
              fontFamily: "sans-serif",
              lineHeight: 1.4,
            }}
          >
            {point}
          </div>
        );
      })}

      {frame > 120 && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            right: 80,
            background: "#C8FF00",
            color: "#0D0D0D",
            padding: "20px 40px",
            borderRadius: 60,
            fontWeight: 800,
            fontSize: 36,
            fontFamily: "sans-serif",
          }}
        >
          {cta}
        </div>
      )}
    </AbsoluteFill>
  );
};
