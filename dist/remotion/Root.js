"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const KineticText_1 = require("./templates/KineticText");
const SplitScreen_1 = require("./templates/SplitScreen");
const CountdownReveal_1 = require("./templates/CountdownReveal");
const QuoteCard_1 = require("./templates/QuoteCard");
const StoryArc_1 = require("./templates/StoryArc");
const GridReveal_1 = require("./templates/GridReveal");
const PhotoSlide_1 = require("./templates/PhotoSlide");
const photoDefaultProps = {
    headline: "Ce este un ETF",
    lines: [
        "Un ETF este...",
        "El cuprinde cele mai bune companii din domeniul...",
    ],
    slideNumber: 1,
    totalSlides: 3,
};
const defaultProps = {
    hook: "Românii pierd 2000 lei lunar fără să știe",
    points: [
        "Abonamentele neutilizate costă 150 lei/lună",
        "Mâncatul în oraș de 3x/săptămână = 1200 lei pierdute",
        "Taxe bancare inutile: 650 lei/an",
    ],
    cta: "Salvează și verifică astăzi!",
    caption: "Caption aici",
    hashtags: "#finantepersonale #bani",
    topic_summary: "Cheltuieli ascunse",
};
const Root = () => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "KineticText", component: KineticText_1.KineticText, durationInFrames: 450, fps: 30, width: 1080, height: 1920, defaultProps: defaultProps }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "SplitScreen", component: SplitScreen_1.SplitScreen, durationInFrames: 450, fps: 30, width: 1080, height: 1920, defaultProps: defaultProps }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "CountdownReveal", component: CountdownReveal_1.CountdownReveal, durationInFrames: 450, fps: 30, width: 1080, height: 1920, defaultProps: defaultProps }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "QuoteCard", component: QuoteCard_1.QuoteCard, durationInFrames: 450, fps: 30, width: 1080, height: 1920, defaultProps: defaultProps }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "StoryArc", component: StoryArc_1.StoryArc, durationInFrames: 450, fps: 30, width: 1080, height: 1920, defaultProps: defaultProps }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "GridReveal", component: GridReveal_1.GridReveal, durationInFrames: 450, fps: 30, width: 1080, height: 1920, defaultProps: defaultProps }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "PhotoSlide", component: PhotoSlide_1.PhotoSlide, durationInFrames: 1, fps: 30, width: 1080, height: 1350, defaultProps: photoDefaultProps })] }));
};
exports.Root = Root;
