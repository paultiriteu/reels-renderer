"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryArc = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const StoryArc = ({ hook, points, cta }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const hookOpacity = (0, remotion_1.interpolate)(frame, [0, 20], [0, 1]);
    const stages = ["Problema", "Realitatea", "Soluția"];
    const stageColors = ["#FF4D4D", "#FFD700", "#00E096"];
    return ((0, jsx_runtime_1.jsxs)(remotion_1.AbsoluteFill, { style: { background: "#0E0900", padding: 80, flexDirection: "column", justifyContent: "center" }, children: [(0, jsx_runtime_1.jsx)("div", { style: { opacity: hookOpacity, fontSize: 60, fontWeight: 900, color: "#FFD700", lineHeight: 1.2, marginBottom: 80, fontFamily: "sans-serif", textAlign: "center" }, children: hook }), points.map((point, i) => {
                const delay = 30 + i * 45;
                const opacity = (0, remotion_1.interpolate)(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                const x = (0, remotion_1.interpolate)(frame, [delay, delay + 20], [-60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return ((0, jsx_runtime_1.jsxs)("div", { style: { opacity, transform: `translateX(${x}px)`, marginBottom: 48, padding: "28px 36px", background: stageColors[i] + "18", borderLeft: `6px solid ${stageColors[i]}`, borderRadius: 12 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: 22, fontWeight: 700, color: stageColors[i], marginBottom: 10, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: 2 }, children: stages[i] }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: 36, color: "#ffffff", fontFamily: "sans-serif", lineHeight: 1.4 }, children: point })] }, i));
            }), frame > 150 && ((0, jsx_runtime_1.jsx)("div", { style: { background: "#FFD700", color: "#0E0900", padding: "20px 40px", borderRadius: 60, fontWeight: 800, fontSize: 36, fontFamily: "sans-serif", textAlign: "center", marginTop: 20 }, children: cta }))] }));
};
exports.StoryArc = StoryArc;
