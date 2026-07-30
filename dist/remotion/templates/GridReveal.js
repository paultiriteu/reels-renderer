"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridReveal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const GridReveal = ({ hook, points, cta }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const hookOpacity = (0, remotion_1.interpolate)(frame, [0, 20], [0, 1]);
    const cells = [points[0] || "", points[1] || "", points[2] || "", cta];
    const cellColors = ["#FF6B8A", "#FF6B8A", "#FF6B8A", "#ffffff"];
    const cellBgs = ["#1A0810", "#1A0810", "#1A0810", "#FF6B8A"];
    return ((0, jsx_runtime_1.jsxs)(remotion_1.AbsoluteFill, { style: { background: "#110A10", padding: 80, flexDirection: "column", justifyContent: "center" }, children: [(0, jsx_runtime_1.jsx)("div", { style: { opacity: hookOpacity, fontSize: 58, fontWeight: 900, color: "#FF6B8A", lineHeight: 1.2, marginBottom: 60, fontFamily: "sans-serif", textAlign: "center" }, children: hook }), (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: 20 }, children: cells.map((cell, i) => {
                    const delay = 30 + i * 30;
                    const opacity = (0, remotion_1.interpolate)(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                    const scale = (0, remotion_1.interpolate)(frame, [delay, delay + 20], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                    return ((0, jsx_runtime_1.jsx)("div", { style: { opacity, transform: `scale(${scale})`, width: "calc(50% - 10px)", background: cellBgs[i], border: `2px solid ${cellColors[i]}44`, borderRadius: 20, padding: "36px 28px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }, children: (0, jsx_runtime_1.jsx)("div", { style: { fontSize: i === 3 ? 40 : 32, fontWeight: i === 3 ? 900 : 600, color: cellColors[i], fontFamily: "sans-serif", textAlign: "center", lineHeight: 1.4 }, children: cell }) }, i));
                }) })] }));
};
exports.GridReveal = GridReveal;
