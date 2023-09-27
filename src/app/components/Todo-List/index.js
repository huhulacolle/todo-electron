class TodoList extends HTMLElement {
  // On creer les éléments
  $ui = document.createElement("link");
  tasks = [];

  constructor() {
    super();
    // on défini les property de la balise style
    this.$ui.id = "style-list";
    this.$ui.setAttribute("rel", "stylesheet");
    this.$ui.setAttribute("type", "text/css");
    this.$ui.setAttribute("href", "../app/ui/todo/list.css");
  }

  connectedCallback() {
    const store = new Store();

    let $host = this.getRootNode();
    if ($host && !$host.querySelector("#style-list")) {
      $host.prepend(this.$ui);
    }

    this.addEventListener("click", (e) => {

      console.log(e);

      if (e.target.classList.contains("edit")) {
        let $input = document.createElement("input");
        let $task = e.target.closest("todo-task");

        $input.value = $task.$value.textContent;
        $input.dataset.backup = $input.value;
        $task.$value.textContent = "";
        $task.prepend($input);
        return;
      }

      if (e.target.classList.contains("validate")) {
        const listTask = JSON.parse(store.get("tasks"));
        let $task = e.target.closest("todo-task");
        let $input = $task.querySelector("input");

        const index = listTask.indexOf($input.value);
        listTask[index] = $input.value;
        store.set("tasks", JSON.stringify(listTask));

        $task.$value.textContent = $input.value;
        $input.remove();

        return;
      }

      if (e.target.classList.contains("delete")) {
        const listTask = JSON.parse(store.get("tasks"));
        let $task = e.target.closest("todo-task");
        let $input = $task.querySelector("input");
        if ($input) {
          const newListTask = listTask.filter((f) => f != $input.value)
          store.set("tasks", JSON.stringify(newListTask));
          $task.$value.textContent = $input.dataset.backup;
          $input.remove();
          $task.remove();
        } else {
          $task.remove();
        }

        return;
      }

      e.target.nodeName === "DIV"
        ? e.target.closest("todo-task").classList.toggle("check")
        : e.target.classList.toggle("check");
    });

    let stringTasks = store.get("tasks");

    if (stringTasks == undefined) {
      store.set("tasks", "[]");
      stringTasks = "[]";
    }

    const tasks = JSON.parse(stringTasks);

    tasks.forEach((t) => {
      const $task = document.createElement("todo-task");
      $task.$value.innerHTML = t;
      this.appendChild($task);
    });

  }
}

customElements.define("todo-list", TodoList);
