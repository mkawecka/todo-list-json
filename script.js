const tasks = [
	{ id: 0, category: 'work', text: 'make a call' },
	{ id: 1, category: 'home', text: 'pay rent' },
	{ id: 2, category: 'kids', text: 'buy LEGO' },
	{ id: 3, category: 'other', text: 'walk the dog' },
];

const categoryIcon = {
	work: 'briefcase',
	home: 'home',
	kids: 'child',
	other: 'tasks',
};

let todoInput;
let errorInfo;
let addBtn;
let ulList;
let newTodo;
let popup;
let popupInfo;
let todoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
	render();
};

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('.todolist ul');
	popup = document.querySelector('.popup');
	popupInfo = document.querySelector('.popup-info');
	popupInput = document.querySelector('.popup-input');
	popupTaskCategory = document.querySelector('#popup-task-category');
	popupAddBtn = document.querySelector('.accept');
	popupCloseBtn = document.querySelector('.cancel');
	categorySelect = document.querySelector('#task-category');
	categoryOptions = document.querySelectorAll('.category-option');
	categoryIcons = document.querySelectorAll('.category-icon');
};

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addTask);
	ulList.addEventListener('click', checkClick);
	popupCloseBtn.addEventListener('click', closePopup);
	popupAddBtn.addEventListener('click', changeTodoText);
	todoInput.addEventListener('keyup', enterKeycheck);
};

const addTask = () => {
	errorInfo.textContent = '';

	if (todoInput.value !== '' && categorySelect.value !== '0') {
		const newTask = {
			id: tasks.length,
			category: categorySelect.value,
			text: todoInput.value,
		};
		renderTask(newTask);

		todoInput.value = '';
		categorySelect.value = '0';
		errorInfo.textContent = '';
	} else if (todoInput.value !== '' && categorySelect.value === '0') {
		errorInfo.textContent = 'Select task category!';
	} else if (todoInput.value === '' && categorySelect.value !== '0') {
		errorInfo.textContent = 'Enter task name!';
	} else {
		errorInfo.textContent = 'Enter task name and select task category!';
	}
};

const renderTask = ({ id, category, text }) => {
	const task = document.createElement('li');
	const taskPanel = document.createElement('div');
	taskPanel.classList.add('task');
	taskPanel.innerHTML = `<i class="category-icon fas fa-${categoryIcon[category]}"></i> ${text}`;

	task.id = id;
	task.append(taskPanel);

	createToolsArea(task);
	ulList.append(task);
};

const render = () => {
	tasks.forEach(renderTask);
};

const createToolsArea = task => {
	const toolsPanel = document.createElement('div');
	toolsPanel.classList.add('tools');
	task.append(toolsPanel);

	const completeBtn = document.createElement('button');
	completeBtn.classList.add('complete');
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	const editBtn = document.createElement('button');
	editBtn.classList.add('edit');
	editBtn.textContent = 'EDIT';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete');
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed');
		e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		editTodo(e);
	} else if (e.target.matches('.delete')) {
		deleteTodo(e);
	}
};

const editTodo = e => {
	todoToEdit = e.target.closest('li');
	const taskId = todoToEdit.id;
	const task = tasks.find(task => task.id == taskId);

	popupInput.value = task.text;
	popupTaskCategory.value = task.category;

	popup.style.display = 'flex';
};

const closePopup = () => {
	popup.style.display = 'none';
};

const changeTodoText = () => {
	if (popupInput.value !== '') {
		const taskId = todoToEdit.id;
		const task = tasks.find(task => task.id == taskId);

		task.category = popupTaskCategory.value;
		task.text = popupInput.value;

		todoToEdit.firstChild.innerHTML = `<i class="category-icon fas fa-${categoryIcon[task.category]}"></i> ${
			task.text
		}`;
		popup.style.display = 'none';
		popupInfo.textContent = ' ';
	} else {
		popupInfo.textContent = 'Podaj treść';
	}
};
const deleteTodo = e => {
	e.target.closest('li').remove();

	const allTodos = ulList.querySelectorAll('li');

	if (allTodos.length === 0) {
		errorInfo.textContent = 'No task to do ;)';
	}
};

const enterKeycheck = e => {
	if (e.key === 'Enter') {
		addNewTodo();
	}
};

document.addEventListener('DOMContentLoaded', main);
