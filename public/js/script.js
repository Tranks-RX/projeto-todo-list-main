document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("new-task");
    const taskList = document.getElementById("task-list");
    const taskCount = document.getElementById("task-count");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const clearButton = document.getElementById("clear-completed");
    const darkModeToggle = document.querySelector(".darkmode-toggle");

    // Alternar modo escuro
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("darkmode");
    });

    // Adicionar nova tarefa
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && input.value.trim() !== "") {
            addTask(input.value.trim());
            input.value = "";
        }
    });

    function addTask(text) {
        const item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `
            <input type="checkbox">
            <span>${text}</span>
        `;
        taskList.appendChild(item);
        updateEvents();
    }

    function updateEvents() {
        document.querySelectorAll(".item input[type='checkbox']").forEach(checkbox => {
            checkbox.removeEventListener("change", handleCheck);
            checkbox.addEventListener("change", handleCheck);
        });
        updateCount();
        applyFilter(); // Garante que a filtragem seja aplicada
    }

    function handleCheck() {
        this.parentElement.classList.toggle("item-checked", this.checked);
        updateCount();
        applyFilter(); // Reaplica a filtragem quando o status muda
    }

    function updateCount() {
        const remaining = document.querySelectorAll(".item input:not(:checked)").length;
        taskCount.textContent = `${remaining} itens restantes`;
    }

    // Filtragem de tarefas
    filterButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            applyFilter();
        });
    });

    function applyFilter() {
        const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-filter");
        document.querySelectorAll(".item").forEach(item => {
            const isChecked = item.querySelector("input").checked;
            if (activeFilter === "todos") {
                item.style.display = "flex";
            } else if (activeFilter === "ativos") {
                item.style.display = isChecked ? "none" : "flex";
            } else if (activeFilter === "concluidos") {
                item.style.display = isChecked ? "flex" : "none";
            }
        });
    }

    // Limpar todas as tarefas concluídas
    clearButton.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelectorAll(".item input:checked").forEach(checkbox => {
            checkbox.parentElement.remove();
        });
        updateCount();
    });

    updateEvents();
});
