export interface DominoEvent {
    name: string;
    data?: any;
    handler: (...args: any[]) => any
}