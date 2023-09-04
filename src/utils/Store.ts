import Block from "./Block";
import { EventBus } from "./EventBus";
import { set } from "./helpers";
import { IChat, IMessage, User } from "./Interfaces";

export interface UserStateProps {
  data?: User;
  error?: string;
  isLoading?: boolean;
}
export interface StateProps {
  user: UserStateProps;
  chats: IChat[];
  messages?: Record<number, IMessage[]>;
  selectedChatId?: number;
}

export enum StoreEvents {
  Updated = "updated"
}

export class Store extends EventBus {
  private state: StateProps = {
    user: {},
    chats: []
  };

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

          previousState = { ...stateProps };

          this.setProps({ ...previousState });
        });
      }
    };
  };
}

export const withUser = withStore((state) => ({ ...state.user }));
export const withSelectedChatId = withStore((state) => ({ selectedChatId: state.selectedChatId }));
export const withSelectedChatMessages = withStore((state) => {
  const chatId = state.selectedChatId;

  if (!chatId) {
    return {
      messages: [],
      selectedChatId: undefined,
      userId: state.user.data?.id,
      selectedChat: undefined,
      chats: state.chats
    };
  }

  return {
    messages: (state.messages || {})[chatId] || [],
    selectedChatId: state.selectedChatId,
    userId: state.user.data?.id,
    selectedChat: state.chats.find((chat) => chat.id === chatId),
    chats: state.chats
  };
});

export default store;
