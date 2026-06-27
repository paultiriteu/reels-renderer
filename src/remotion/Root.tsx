import { Composition } from "remotion";
import { KineticText } from "./templates/KineticText";
import { SplitScreen } from "./templates/SplitScreen";
import { CountdownReveal } from "./templates/CountdownReveal";
import { QuoteCard } from "./templates/QuoteCard";
import { StoryArc } from "./templates/StoryArc";
import { GridReveal } from "./templates/GridReveal";

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

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="KineticText"
        component={KineticText as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
      <Composition
        id="SplitScreen"
        component={SplitScreen as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
      <Composition
        id="CountdownReveal"
        component={CountdownReveal as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
      <Composition
        id="QuoteCard"
        component={QuoteCard as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
      <Composition
        id="StoryArc"
        component={StoryArc as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
      <Composition
        id="GridReveal"
        component={GridReveal as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
    </>
  );
};
