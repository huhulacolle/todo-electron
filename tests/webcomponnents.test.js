const TodoTask = require("../src/app/components/Todo-Task");
const TodoInput = require("../src/app/components/Todo-Input");
const TodoList = require("../src/app/components/Todo-List");
const TodoManager = require("../src/app/components/Todo-Manager");


const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM();
global.document    = dom.window.document;
global.window      = dom.window;
global.HTMLElement = dom.window.HTMLElement;


describe('TodoManager', () => {
  let todoManager;

  beforeEach(() => {
    todoManager = new TodoManager();
  });

  // Test the constructor
  test('should set default properties correctly', () => {
    expect(todoManager.$ui.tagName).toBe('LINK');
    expect(todoManager.$list.tagName).toBe('TODO-LIST');
    expect(todoManager.$input.tagName).toBe('TODO-INPUT');
  });

  // Test connectedCallback method
  test('should append child elements correctly', () => {
    todoManager.connectedCallback();
    const shadowRootChildren = Array.from(todoManager.shadowRoot.children);
    expect(shadowRootChildren).toEqual(expect.arrayContaining([todoManager.$ui, todoManager.$list, todoManager.$input]));
  });
});
