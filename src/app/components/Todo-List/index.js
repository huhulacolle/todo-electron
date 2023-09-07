class TodoList extends HTMLElement{

    // On creer les éléments
    $ui     = document.createElement("link")
    tasks   = []
    
    constructor(){
        super()
        // on défini les property de la balise style
        this.$ui.id = "style-list"
        this.$ui.setAttribute("rel","stylesheet")
        this.$ui.setAttribute("type","text/css")
        this.$ui.setAttribute("href", "../app/ui/todo/list.css")
    }
    
    connectedCallback(){
        let $host = this.getRootNode();
        if ($host && !$host.querySelector("#style-list")){
            $host.prepend(this.$ui)
        }

        this.addEventListener("click", e => {
            if (e.target.classList.contains("edit") ){
                let $input = document.createElement("input")
                let $task  = e.target.closest("todo-task");

                $input.value             = $task.$value.textContent
                $input.dataset.backup    = $input.value
                $task.$value.textContent = ""
                $task.prepend($input);
                return
            }

            if (e.target.classList.contains("validate") ){
                let $task  = e.target.closest("todo-task");
                let $input = $task.querySelector("input");

                $task.$value.textContent = $input.value
                $input.remove()
                
                return
            }

            if (e.target.classList.contains("delete")){
                let $task  = e.target.closest("todo-task");
                let $input = $task.querySelector("input");

                if ($input){
                    $task.$value.textContent = $input.dataset.backup;
                    $input.remove()
                } else {
                    $task.remove()
                }
                
                return
            }


            e.target.nodeName === "DIV" 
                ? e.target.closest("todo-task").classList.toggle("check")
                : e.target.classList.toggle("check")
        })

        for (let i=0; i< 100;i++){
            let $task = document.createElement("todo-task")
                $task.$value.innerHTML = "Task " + i
            this.appendChild($task)
        }

    }

}

customElements.define("todo-list", TodoList)