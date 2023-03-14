import { UserStateProps, withUser } from "../../utils/Store";
import Block from "../../utils/Block";
import template from "./loader.hbs";

interface LoaderProps extends UserStateProps {}

class LoaderBase extends Block<LoaderProps> {
  constructor(props: LoaderProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

//@ts-ignore
export const Loader = withUser(LoaderBase);
