"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KineticText = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const KineticText = ({ hook, points, cta }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const hookOpacity = (0, remotion_1.interpolate)(frame, [0, 20], [0, 1]);
    const hookY = (0, remotion_1.interpolate)(frame, [0, 20], [40, 0], { extrapolateRight: "clamp" });
    return ((0, jsx_runtime_1.jsxs)(remotion_1.AbsoluteFill, { style: { background: "#0D0D0D", padding: 80, justifyContent: "center", flexDirection: "column" }, children: [(0, jsx_runtime_1.jsx)("div", { style: { opacity: hookOpacity, transform: `translateY(${hookY}px)`, fontSize: 72, fontWeight: 900, color: "#C8FF00", lineHeight: 1.1, marginBottom: 60, fontFamily: "sans-serif" }, children: hook }), points.map((point, i) => {
                const delay = 30 + i * 25;
                const opacity = (0, remotion_1.interpolate)(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                const y = (0, remotion_1.interpolate)(frame, [delay, delay + 15], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return ((0, jsx_runtime_1.jsx)("div", { style: { opacity, transform: `translateY(${y}px)`, fontSize: 38, color: "#ffffff", marginBottom: 32, paddingLeft: 32, borderLeft: "4px solid #C8FF00", fontFamily: "sans-serif", lineHeight: 1.4 }, children: point }, i));
            }), frame > 120 && ((0, jsx_runtime_1.jsx)("div", { style: { position: "absolute", bottom: 120, right: 80, background: "#C8FF00", color: "#0D0D0D", padding: "20px 40px", borderRadius: 60, fontWeight: 800, fontSize: 36, fontFamily: "sans-serif" }, children: cta }))] }));
};
exports.KineticText = KineticText;
