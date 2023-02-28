import Block from "../../utils/Block";
import { Icon } from "../icon";
import template from "./pop-list-item.hbs";

interface PopListItemProps {
  title: string;
  icon: string;
  events: {
    click: () => void;
  };
  className: string;
}

export class PopListItem extends Block<PopListItemProps> {
  constructor(props: PopListItemProps) {
    super(props);
  }
  protected init(): void {
    this.children.icon = new Icon({
      src: this.props.icon,
      className: this.props.className,
      alt: "icon",
      events: {
        click: () => {},
      },
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
