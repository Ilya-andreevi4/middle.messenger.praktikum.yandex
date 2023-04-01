import { expect } from "chai";
import Block from "./Block";

describe("Block", () => {
  let ComponentMock: typeof Block, ComponentMockWithRender: typeof Block, isCalled: boolean;
  const contentString = "text";

  beforeEach(() => {
    isCalled = false;
    ComponentMock = class extends Block {};
    ComponentMockWithRender = class extends Block {
      render() {
        const fragment = new DocumentFragment();
        const div = document.createElement("div");
        div.textContent = contentString;
        fragment.append(div);
        return fragment;
      }
    };
  });

  it("should run protected init on initialization", () => {
    ComponentMock = class extends ComponentMockWithRender {
      init() {
        isCalled = true;
      }
    };
    const component = new ComponentMock({});

    expect(isCalled).to.eq(true);
    expect(component.getContent()!.textContent).to.eq(contentString);
  });

  it("should run protected componentDidUpdate on .setProps()", () => {
    ComponentMock = class extends Block {
      componentDidUpdate() {
        isCalled = true;
        return true;
      }
    };
    const component = new ComponentMock({ test: "" });
    component.setProps({ test: contentString });

    expect(isCalled).to.eq(true);
  });

  it("should throw error when trying to delete component props", () => {
    const component = new ComponentMock({ test: contentString });
    const func = () => {
      // @ts-ignore
      delete component.props.test;
    };

    expect(func).to.throw(Error);
  });

  it("should re-render on props change specified in protected componentDidUpdate", () => {
    const prop = "prop";
    const secProp = "secProp";
    ComponentMock = class extends Block {
      // @ts-ignore
      componentDidUpdate(oldProps, newProps) {
        return oldProps.propA !== newProps.propA;
      }

      render() {
        const fragment = new DocumentFragment();
        const div = document.createElement("div");
        div.textContent = this.props.secProp;
        fragment.append(div);
        return fragment;
      }
    };

    const component = new ComponentMock({ prop, secProp });
    expect(component.getContent()!.textContent).to.eq(secProp);

    component.setProps({ secProp: "secProp_new" });
    expect(component.getContent()!.textContent).to.eq(secProp);
  });

  it("should save props not entered in .setProps() and change the props that are entered", () => {
    const prop = "prop";
    const secProp = "secProp";
    ComponentMock = class extends Block {
      // @ts-ignore
      componentDidUpdate(oldProps, newProps) {
        return oldProps.prop !== newProps.prop && oldProps.secProp !== newProps.secProp;
      }
    };

    const component = new ComponentMock({ prop, secProp });
    expect(component.props.secProp).to.eq(secProp);
    expect(component.props.prop).to.eq(prop);

    component.setProps({ prop: "prop_new" });
    expect(component.props.secProp).to.eq(secProp);
    expect(component.props.prop).to.not.eq(prop);
  });

  it("should recognize props and children in object passed to constructor", () => {
    const child = new Block({});
    const propsObj = { test: contentString };
    const childrenObj = { button: child };
    const component = new ComponentMock({ ...propsObj, ...childrenObj });

    expect(component.props).to.include(propsObj);
    expect(component.props).to.not.include(childrenObj);
    expect(component.children).to.not.include(propsObj);
    expect(component.children).to.include(childrenObj);
  });

  it("should be visible on .show()", () => {
    const component = new ComponentMockWithRender({});
    component.show();
    expect(component.getContent()!.style.display).to.eq("flex");
  });

  it("should be hidden on .hide()", () => {
    const component = new ComponentMockWithRender({});
    component.hide();
    expect(component.getContent()!.style.display).to.eq("none");
  });
});
