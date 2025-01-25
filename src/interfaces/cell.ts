export interface Cell {
    character: string | null;
    selected?: boolean;
    correctPlace?: boolean;
    existsInTheWord?: boolean;
}