export type TodoType = {
    _id?: string;
    owner: string;
    title: string;
    desc: string;
    status: "todo" | "ongoing" | "completed";
    deadline: string;
};
