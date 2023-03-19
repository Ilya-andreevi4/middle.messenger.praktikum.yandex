import WSTransport, { WSTransportEvents } from "../utils/WSTransport";
import store from "../utils/Store";
import { IMessage } from "../utils/Interfaces";
import chatController from "./ChatController";

class MessagesControllerBase {
  private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    if (this.sockets.has(id)) {
      return;
    }

    const userId = store.getState().user.data?.id;

    const wsTransport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);

    this.sockets.set(id, wsTransport);

    await wsTransport.connect();

    this.subscribe(wsTransport, id);
    this.fetchOldMessages(id);
  }

  async sendMessage(id: number, message: string) {
    const socket = await this.getSocket(id);

    socket.send({
      type: "message",
      content: message,
    });
  }

  fetchOldMessages(id: number, page: number = 0) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({ type: "get old", content: page.toString() });
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close());
  }

  async getSocket(id: number) {
    const socket = this.sockets.get(id);
    if (!socket) {
      await this.connect(id, await chatController.getToken(id));
      return this.sockets.get(id)!;
    }
    return socket;
  }

  private onMessage(id: number, messages: IMessage | IMessage[]) {
    let messagesToAdd: IMessage[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = (store.getState().messages || {})[id] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    store.set(`messages.${id}`, messagesToAdd);
  }

  private onClose(id: number) {
    this.sockets.delete(id);
  }

  private subscribe(transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.Message, (message) => this.onMessage(id, message));
    transport.on(WSTransportEvents.Close, () => this.onClose(id));
  }
}

const MessagesController = new MessagesControllerBase();

// @ts-ignore
window.messagesController = MessagesController;

export default MessagesController;
