"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const SplitScreen = ({ hook, points, cta }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const hookOpacity = (0, remotion_1.interpolate)(frame, [0, 20], [0, 1]);
    return ((0, jsx_runtime_1.jsxs)(remotion_1.AbsoluteFill, { style: { background: "#1A1A2E", flexDirection: "column" }, children: [(0, jsx_runtime_1.jsx)("div", { style: { flex: 1, background: "#FF6B35", justifyContent: "center", alignItems: "center", display: "flex", padding: 60 }, children: (0, jsx_runtime_1.jsx)("div", { style: { opacity: hookOpacity, fontSize: 64, fontWeight: 900, color: "#ffffff", textAlign: "center", fontFamily: "sans-serif", lineHeight: 1.2 }, children: hook }) }), (0, jsx_runtime_1.jsxs)("div", { style: { flex: 1, padding: 60, justifyContent: "center", flexDirection: "column", display: "flex" }, children: [points.map((point, i) => {
                        const delay = 30 + i * 25;
                        const opacity = (0, remotion_1.interpolate)(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                        return ((0, jsx_runtime_1.jsx)("div", { style: { opacity, fontSize: 36, color: "#ffffff", marginBottom: 36, paddingLeft: 28, borderLeft: "4px solid #FF6B35", fontFamily: "sans-serif", lineHeight: 1.4 }, children: point }, i));
                    }), frame > 120 && ((0, jsx_runtime_1.jsx)("div", { style: { background: "#FF6B35", color: "#ffffff", padding: "16px 36px", borderRadius: 50, fontWeight: 800, fontSize: 32, fontFamily: "sans-serif", alignSelf: "flex-start", marginTop: 20 }, children: cta }))] })] }));
};
exports.SplitScreen = SplitScreen;
