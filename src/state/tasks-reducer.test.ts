import {addTaskAC, updateTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from "../api/todolists-a-p-i";
import {TasksStateType} from "../AppWithRedux";

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, startDate:"", priority: TaskPriorities.Hi, order: 0, deadline: "", addedDate: "", description: "", todoListId: "todolistId1" },
            { id: "2", title: "HTML", status: TaskStatuses.New, startDate:"", priority: TaskPriorities.Hi, order: 1, deadline: "", addedDate: "", description: "", todoListId: "todolistId1" },
            { id: "3", title: "JS", status: TaskStatuses.New, startDate:"", priority: TaskPriorities.Hi, order: 2, deadline: "", addedDate: "", description: "", todoListId: "todolistId1" },
        ],
        "todolistId2": [
            { id: "1", title: "Milk", status: TaskStatuses.New, startDate:"", priority: TaskPriorities.Hi, order: 0, deadline: "", addedDate: "", description: "", todoListId: "todolistId2" },
            { id: "2", title: "Bread", status: TaskStatuses.New, startDate:"", priority: TaskPriorities.Hi, order: 1, deadline: "", addedDate: "", description: "", todoListId: "todolistId2" },
            { id: "3", title: "Meat", status: TaskStatuses.New, startDate:"", priority: TaskPriorities.Hi, order: 2, deadline: "", addedDate: "", description: "", todoListId: "todolistId2" },
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});
test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        todoListId: "todolistId2",
        title: "juice",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Middle,
        startDate: "",
        id: "1"
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses);
});
test('status of specified task should be changed', () => {
    const action = updateTaskAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});
test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC("2", "yogurt", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("yogurt");
    expect(endState["todolistId2"][0].title).toBe("bread");
});
test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('propertry with todolistId should be deleted', () => {
    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistsAC([
        {id: "1", title: "title1", order: 0, addedDate: ""},
        {id: "2", title: "title2", addedDate: "", order: 1},
    ])

    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState["2"]).toStrictEqual([])
});
