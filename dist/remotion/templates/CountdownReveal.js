"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountdownReveal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const CountdownReveal = ({ hook, points, cta }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const hookOpacity = (0, remotion_1.interpolate)(frame, [0, 20], [0, 1]);
    return ((0, jsx_runtime_1.jsxs)(remotion_1.AbsoluteFill, { style: { background: "#0F0A1E", padding: 80, flexDirection: "column", justifyContent: "center" }, children: [(0, jsx_runtime_1.jsx)("div", { style: { opacity: hookOpacity, fontSize: 64, fontWeight: 900, color: "#ffffff", lineHeight: 1.2, marginBottom: 80, fontFamily: "sans-serif", textAlign: "center" }, children: hook }), points.map((point, i) => {
                const number = points.length - i;
                const delay = 30 + i * 40;
                const opacity = (0, remotion_1.interpolate)(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                const scale = (0, remotion_1.interpolate)(frame, [delay, delay + 20], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return ((0, jsx_runtime_1.jsxs)("div", { style: { opacity, transform: `scale(${scale})`, display: "flex", alignItems: "center", gap: 32, marginBottom: 48 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { width: 80, height: 80, borderRadius: "50%", background: "#A78BFA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, color: "#ffffff", fontFamily: "sans-serif", flexShrink: 0 }, children: number }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: 36, color: "#ffffff", fontFamily: "sans-serif", lineHeight: 1.4, flex: 1 }, children: point })] }, i));
            }), frame > 140 && ((0, jsx_runtime_1.jsx)("div", { style: { background: "#A78BFA", color: "#ffffff", padding: "20px 40px", borderRadius: 60, fontWeight: 800, fontSize: 36, fontFamily: "sans-serif", textAlign: "center", marginTop: 20 }, children: cta }))] }));
};
exports.CountdownReveal = CountdownReveal;
