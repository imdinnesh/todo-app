export interface Task {
    id: string;
    title: string;
    description?: string;
    mobileNo: string;
    currentDate: string;
    endDate: string;
    status: 'pending' | 'completed';
    createdAt: Date;
    updatedAt: Date;
}
