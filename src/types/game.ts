interface Game {
    name: string;
    level: Level[];
}

interface Level {
    created_by: string;
    created_at: string;
    modified_by: string;
    modified_at: string;
    name: string;
    _id: string;
}

export type { Game, Level }