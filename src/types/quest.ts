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
    stages: QuestStage[]
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
    triggerType: string,
    triggerIds: string[],
    text: string,
    backupTimeSeconds: number,
    backupTextId: string,
    stageIndex: number,
    name: string,
}
