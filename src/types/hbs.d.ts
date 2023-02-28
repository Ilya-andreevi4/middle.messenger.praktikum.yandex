declare module "*.hbs" {
  import { TemplateDelegate } from "handlebars/runtime";

  declare const template: TemplateDelegate;

  export default template;
}

declare module "handlebars/dist/handlebars.runtime";

declare module "*.pcss";
declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.json";
