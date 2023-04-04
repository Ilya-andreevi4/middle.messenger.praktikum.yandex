import template from "./popup-form-add-files.hbs";
import Block from "../../utils/Block";
import { IconsExports } from "../../utils/media-exports";
import { Field } from "../field";
import { Icon } from "../icon";
import { PopupItem } from "../popup-item";

interface AddFilesPopupFormProps {
  className: string;
  popItems?: IPopItem[];
  popupListItems?: PopupItem[];
}

interface IPopItem {
  id: string;
  icon: string;
  title: string;
}

export class AddFilesPopupForm extends Block<AddFilesPopupFormProps> {
  constructor(props: AddFilesPopupFormProps) {
    super(props);
  }

  protected init(): void {
    this.props.popItems = [
      {
        icon: IconsExports.MediaIcon,
        title: "Media",
        id: "media"
      },
      {
        icon: IconsExports.FileAddIcon,
        title: "File",
        id: "file"
      },
      {
        icon: IconsExports.LocationIcon,
        title: "Location",
        id: "location"
      }
    ];
    this.children.popupListItems = this.props.popItems.map(
      (item, i) =>
        new PopupItem({
          className: this.props.className,
          icon: new Icon({
            src: item.icon,
            className: this.props.className,
            alt: "icon"
          }),
          field: new Field({
            label: item.title,
            regex: /^[\w\W]*$/,
            className: this.props.className,
            name: "file",
            id: item.id,
            type: "file"
          }),
          events: {
            change: (e) => {
              // TODO add files to sending message
              e.preventDefault();
              (this.children.popupListItems as PopupItem[])[i].logData();
            }
          }
        })
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
