import { storiesOf } from "@storybook/html";
import { withKnobs } from "@storybook/addon-knobs";
import { withClassPropertiesKnobs } from "../config/withClassKnobsProperties";

import CounterElement from "./atomify-example/counter-element";

const stories = storiesOf("Counter component", module);

stories.addDecorator(withKnobs);

//@ts-ignore
stories.add("with a button", () => withClassPropertiesKnobs(CounterElement), {
    notes: "Hello docss"
});
