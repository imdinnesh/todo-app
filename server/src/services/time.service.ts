export interface TimeService {
    getCurrentTime(): Promise<string>
}

export class ClockService implements TimeService {
    getCurrentTime(): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(new Date().toISOString());
            }, 1000);
        });
    }
}
