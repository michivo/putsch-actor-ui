export interface Quest {
    id: string,
    subNumber: number,
    state: string,
    name: string,
    description: string,
    phase: number[],
    repeatable: boolean,
    parallel: boolean,
    cooldownTimeMinutes: number,
    stages: QuestStage[],
    npcs: string,
}

export interface QuestStage {
    name: string,
    triggerType: string,
    triggerIds: string[],
    text: string,
    backupTimeSeconds: number,
    backupTextId: string,
}

export interface PlayerQuestStage {
    playerId: string,
    name: string,
    triggerType: string,
    triggerIds: string[],
    text: string,
    backupTimeSeconds: number,
    backupTextId: string,
    stageIndex: number,
    questId: string,
    playlistName: string,
    currentLocation: string,
    stageCount: number,
    delaySeconds: number,
    homeOffice: string,
    npcName: string,
}
