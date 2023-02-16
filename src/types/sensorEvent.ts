interface SensorEvent {
	sensorId: string;
	playerId: string;
	eventDateUtc: string;
	value: string | number | boolean;
}

export type { SensorEvent };
