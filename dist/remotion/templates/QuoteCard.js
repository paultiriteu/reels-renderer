"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const QuoteCard = ({ hook, points, cta }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const hookOpacity = (0, remotion_1.interpolate)(frame, [0, 25], [0, 1]);
    const hookScale = (0, remotion_1.interpolate)(frame, [0, 25], [0.8, 1], { extrapolateRight: "clamp" });
    const lineWidth = (0, remotion_1.interpolate)(frame, [20, 60], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return ((0, jsx_runtime_1.jsxs)(remotion_1.AbsoluteFill, { style: { background: "#071510", padding: 80, flexDirection: "column", justifyContent: "center", alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)("div", { style: { width: `${lineWidth}%`, height: 4, background: "#00FFAA", marginBottom: 60, borderRadius: 2 } }), (0, jsx_runtime_1.jsx)("div", { style: { opacity: hookOpacity, transform: `scale(${hookScale})`, fontSize: 72, fontWeight: 900, color: "#00FFAA", textAlign: "center", fontFamily: "sans-serif", lineHeight: 1.2, marginBottom: 60 }, children: hook }), (0, jsx_runtime_1.jsx)("div", { style: { width: `${lineWidth}%`, height: 4, background: "#00FFAA", marginBottom: 80, borderRadius: 2 } }), points.map((point, i) => {
                const delay = 60 + i * 25;
                const opacity = (0, remotion_1.interpolate)(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return ((0, jsx_runtime_1.jsx)("div", { style: { opacity, fontSize: 34, color: "#ffffff", textAlign: "center", fontFamily: "sans-serif", lineHeight: 1.5, marginBottom: 24, paddingLeft: 20, paddingRight: 20 }, children: point }, i));
            }), frame > 140 && ((0, jsx_runtime_1.jsx)("div", { style: { position: "absolute", bottom: 100, background: "#00FFAA", color: "#071510", padding: "20px 48px", borderRadius: 60, fontWeight: 800, fontSize: 36, fontFamily: "sans-serif" }, children: cta }))] }));
};
exports.QuoteCard = QuoteCard;
