import template from "./loader.hbs";
import Block from "../../utils/Block";
import { UserStateProps, withUser } from "../../utils/Store";

interface LoaderProps extends UserStateProps {}

class LoaderBase extends Block<LoaderProps> {
  constructor(props: LoaderProps) {
    super(props);
  }

  protected componentDidUpdate(oldProps: LoaderProps, newProps: LoaderProps): boolean {
    if (oldProps.isLoading !== newProps.isLoading) {
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

// @ts-ignore
export const Loader = withUser(LoaderBase);
