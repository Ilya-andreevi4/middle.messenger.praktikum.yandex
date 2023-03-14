import Block from "../../utils/Block";
import template from "./loader.hbs";

interface LoaderProps {
  isLoading: boolean;
}

export class Loader extends Block<LoaderProps> {
  constructor(props: LoaderProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
