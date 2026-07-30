"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoSlide = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
// Static (single-frame) template used for photo/carousel rendering.
// Rendered via renderStill, so no useCurrentFrame / animation here.
const PhotoSlide = ({ headline, lines, slideNumber, totalSlides, }) => {
    return ((0, jsx_runtime_1.jsxs)(remotion_1.AbsoluteFill, { style: {
            background: "#071510",
            padding: 90,
            flexDirection: "column",
            justifyContent: "center",
            fontFamily: "sans-serif",
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    position: "absolute",
                    top: 80,
                    right: 90,
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#00FFAA",
                    fontFamily: "sans-serif",
                    letterSpacing: 2,
                }, children: [slideNumber, "/", totalSlides] }), (0, jsx_runtime_1.jsx)("div", { style: {
                    width: 120,
                    height: 8,
                    background: "#00FFAA",
                    borderRadius: 4,
                    marginBottom: 48,
                } }), (0, jsx_runtime_1.jsx)("div", { style: {
                    fontSize: 76,
                    fontWeight: 900,
                    color: "#00FFAA",
                    lineHeight: 1.15,
                    marginBottom: 60,
                    fontFamily: "sans-serif",
                }, children: headline }), lines.map((line, i) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: 36,
                }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            background: "#00FFAA",
                            marginTop: 18,
                            marginRight: 28,
                            flexShrink: 0,
                        } }), (0, jsx_runtime_1.jsx)("div", { style: {
                            fontSize: 40,
                            color: "#ffffff",
                            lineHeight: 1.4,
                            fontFamily: "sans-serif",
                        }, children: line })] }, i)))] }));
};
exports.PhotoSlide = PhotoSlide;
