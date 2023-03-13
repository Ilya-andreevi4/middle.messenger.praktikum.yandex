import { isEqual, set } from "./helpers";
import { EventBus } from "./EventBus";
import Block from "./Block";
import { User } from "./Interfaces";

export enum StoreEvents {
  Updated = "updated",
}

export interface StateProps {
  user: {
    data?: User;
    error?: string;
    isLoading?: boolean;
  };
  chats?: any[]; //TODO изменить тип
  selectedChatId?: number;
}

export class Store extends EventBus {
  private state: StateProps = { user: {} };

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: StateProps) => any) {
  return function wrap(Component: typeof Block) {
    let previousState: any;

    return class WithStore extends Component {
      constructor(props: any) {
        previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());
          if (isEqual(stateProps, previousState)) {
            return;
          }

          previousState = { ...stateProps };

          this.setProps({ ...previousState });
        });
      }
    };
  };
}

export default store;
