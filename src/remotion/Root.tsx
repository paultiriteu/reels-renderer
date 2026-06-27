import { Composition } from "remotion";
import { KineticText } from "./templates/KineticText";
import { SplitScreen } from "./templates/SplitScreen";
import { CountdownReveal } from "./templates/CountdownReveal";
import { QuoteCard } from "./templates/QuoteCard";
import { StoryArc } from "./templates/StoryArc";
import { GridReveal } from "./templates/GridReveal";

export const Root: React.FC = () => {
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

  return (
    <>
      <Composition
        id="KineticText"
        component={KineticText}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
      <Composition
        id="SplitScreen"
        component={SplitScreen}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
      <Composition
        id="CountdownReveal"
        component={CountdownReveal}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
      <Composition
        id="QuoteCard"
        component={QuoteCard}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
      <Composition
        id="StoryArc"
        component={StoryArc}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
      <Composition
        id="GridReveal"
        component={GridReveal}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
    </>
  );
};
