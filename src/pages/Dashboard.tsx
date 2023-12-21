import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useAxios } from "@/hooks/useAxios";
import { TodoType } from "@/types/todo";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [todo, setTodo] = useState<TodoType[]>();
    const [ongoing, setOngoing] = useState<TodoType[]>();
    const [completed, setCompleted] = useState<TodoType[]>();
    const axios = useAxios();

    useEffect(() => {
        axios
            .get<TodoType[]>("/todo")
            .then((res) => {
                const todoArray: TodoType[] = [];
                const ongoingArray: TodoType[] = [];
                const completedArray: TodoType[] = [];
                res.data.forEach((task) => {
                    if (task.status === "todo") {
                        todoArray.push(task);
                        setTodo(todoArray);
                    } else if (task.status === "ongoing") {
                        ongoingArray.push(task);
                        setOngoing(ongoingArray);
                    } else if (task.status === "completed") {
                        completedArray.push(task);
                        setCompleted(completedArray);
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    function handleOnDropTodo(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        console.log("widgetType", widgetType);

        ongoing?.forEach((task) => {
            if (task._id === widgetType) {
                if (todo) {
                    setTodo([...todo, task]);
                } else {
                    setTodo([task]);
                }
                setOngoing([
                    ...ongoing.filter((task) => task._id !== widgetType),
                ]);
            }
        });
        completed?.forEach((task) => {
            if (task._id === widgetType) {
                if (todo) {
                    setTodo([...todo, task]);
                } else {
                    setTodo([task]);
                }
                setCompleted([
                    ...completed.filter((task) => task._id !== widgetType),
                ]);
            }
        });
    }
    function handleOnDropOngoing(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        console.log("widgetType", widgetType);

        todo?.forEach((task) => {
            if (task._id === widgetType) {
                if (ongoing) {
                    setOngoing([...ongoing, task]);
                } else {
                    setOngoing([task]);
                }
                setTodo([...todo.filter((task) => task._id !== widgetType)]);
            }
        });
        completed?.forEach((task) => {
            if (task._id === widgetType) {
                if (ongoing) {
                    setOngoing([...ongoing, task]);
                } else {
                    setOngoing([task]);
                }
                setCompleted([
                    ...completed.filter((task) => task._id !== widgetType),
                ]);
            }
        });
    }
    function handleOnDropCompleted(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        console.log("widgetType", widgetType);

        todo?.forEach((task) => {
            if (task._id === widgetType) {
                if (completed) {
                    setCompleted([...completed, task]);
                } else {
                    setCompleted([task]);
                }
                setTodo([...todo.filter((task) => task._id !== widgetType)]);
            }
        });
        ongoing?.forEach((task) => {
            if (task._id === widgetType) {
                if (completed) {
                    setCompleted([...completed, task]);
                } else {
                    setCompleted([task]);
                }
                setOngoing([
                    ...ongoing.filter((task) => task._id !== widgetType),
                ]);
            }
        });
    }
    return (
        <>
            <Dialog>
                <DialogTrigger>Create a task</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a task</DialogTitle>
                    </DialogHeader>
                    <TaskForm />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="grid grid-cols-4 h-full">
                <div className="border">Navigation</div>
                <div className="border p-4 flex flex-col gap-5">
                    <h2>Todo</h2>
                    <div
                        onDrop={handleOnDropTodo}
                        onDragOver={handleDragOver}
                        className="h-full"
                    >
                        {todo &&
                            todo.map((task) => {
                                return (
                                    <TaskCard key={task._id} taskData={task} />
                                );
                            })}
                    </div>
                </div>
                <div className="border p-4 flex flex-col gap-5">
                    <h2>Ongoing</h2>
                    <div
                        onDrop={handleOnDropOngoing}
                        onDragOver={handleDragOver}
                        className="h-full"
                    >
                        {ongoing &&
                            ongoing.map((task) => {
                                return (
                                    <TaskCard key={task._id} taskData={task} />
                                );
                            })}
                    </div>
                </div>
                <div className="border p-4 flex flex-col gap-5">
                    <h2>Completed</h2>
                    <div
                        onDrop={handleOnDropCompleted}
                        onDragOver={handleDragOver}
                        className="h-full"
                    >
                        {completed &&
                            completed.map((task) => {
                                return (
                                    <TaskCard key={task._id} taskData={task} />
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}
