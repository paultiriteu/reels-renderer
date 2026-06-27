import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

interface Props {
  hook: string;
  points: string[];
  cta: string;
}

export const SplitScreen: React.FC<Props> = ({ hook, points, cta }) => {
  const frame = useCurrentFrame();

  const hookOpacity = interpolate(frame, [0, 20], [0, 1]);

  return (
    <AbsoluteFill style={{ background: "#1A1A2E", flexDirection: "column" }}>
      {/* Top half - hook */}
      <div
        style={{
          flex: 1,
          background: "#FF6B35",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          padding: 60,
        }}
      >
        <div
          style={{
            opacity: hookOpacity,
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            fontFamily: "sans-serif",
            lineHeight: 1.2,
          }}
        >
          {hook}
        </div>
      </div>

      {/* Bottom half - points */}
      <div
        style={{
          flex: 1,
          padding: 60,
          justifyContent: "center",
          flexDirection: "column",
          display: "flex",
        }}
      >
        {points.map((point, i) => {
          const delay = 30 + i * 25;
          const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                opacity,
                fontSize: 36,
                color: "#ffffff",
                marginBottom: 36,
                paddingLeft: 28,
                borderLeft: "4px solid #FF6B35",
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
              background: "#FF6B35",
              color: "#ffffff",
              padding: "16px 36px",
              borderRadius: 50,
              fontWeight: 800,
              fontSize: 32,
              fontFamily: "sans-serif",
              alignSelf: "flex-start",
              marginTop: 20,
            }}
          >
            {cta}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
