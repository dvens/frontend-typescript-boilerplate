import { storiesOf } from "@storybook/html";

import CounterElement from "./counter-element";

storiesOf("Hello component", module).add(
    "Hello story",
    () => {
        return new CounterElement();
    },
    { notes: "Hello docss" }
);
