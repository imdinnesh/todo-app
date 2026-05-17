import { BadRequestError } from "../utils/api.error";

export class Task {
    constructor(
        public readonly id: string,
        public title: string,
        public mobileNo: string,
        public currentDate: string,
        public endDate: string,
        public status: 'pending' | 'completed',
        public createdAt: Date,
        public updatedAt: Date,
        public description?: string
    ) { }

    update(newTitle?: string, newDescription?: string) {
        if (this.status === 'completed') {
            throw new BadRequestError("Completed tasks cannot be updated");
        }

        if (newTitle !== undefined) this.title = newTitle;
        if (newDescription !== undefined) this.description = newDescription;
        this.updatedAt = new Date();
    }
}



