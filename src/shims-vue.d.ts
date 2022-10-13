import { PluginFunction } from "vue";

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "gsap" {
  export const install: PluginFunction<{}>;
}
