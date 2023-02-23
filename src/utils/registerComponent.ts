import Handlebars from "handlebars/dist/handlebars.runtime";
import Block from "./Block";
import { HelperOptions } from "handlebars";

export function registerComponent(name: string, Component: typeof Block) {
  Handlebars.registerHelper(name, (options: HelperOptions) => {
    const root = options.data.root;

    if (!root.children) {
      root.children = {};
    }

    const component = new Component(options.hash);
    root.children[component.id] = component;

    return `<div data-id="${component.id}"></div>`;
  });
}
