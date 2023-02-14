<script lang="ts">
	import { putschFirestore } from '../../tools/firebase';
	import { collection, getDocs, onSnapshot, type Unsubscribe } from 'firebase/firestore';
	import { onMount, onDestroy } from 'svelte';
	import type { SensorEvent } from '../../types/sensorEvent';

	let sensorEvents: SensorEvent[] = [];
	let sortedEvents: SensorEvent[] = [];
	let firestoreUnsubscribe: Unsubscribe;

	onMount(async () => {
		const querySnapshot = await getDocs(collection(putschFirestore, 'events'));
		querySnapshot.forEach((doc) => {
			const sensorEvent = doc.data() as SensorEvent;
			sensorEvents.push(sensorEvent);
		});
		sensorEvents = sensorEvents;

		firestoreUnsubscribe = onSnapshot(collection(putschFirestore, 'events'), (data) => {
			sensorEvents.splice(0, sensorEvents.length);
			data.docs.forEach((doc) => {
				const sensorEvent = doc.data() as SensorEvent;
				sensorEvents.push(sensorEvent);
			});
            sensorEvents = sensorEvents;
		});
	});

	onDestroy(() => {
		if (firestoreUnsubscribe) {
			firestoreUnsubscribe();
		}
	});

	$: sortedEvents = sensorEvents.sort((s1, s2) =>
		s1.sensorId > s2.sensorId ? 1 : s1.sensorId < s2.sensorId ? -1 : 0
	);
</script>

<table>
	<tr>
		<th>Sensor</th>
		<th>Spieler</th>
		<th>Wert</th>
		<th>Zeit</th>
	</tr>
	{#each sortedEvents as event}
		<tr>
			<td>{event.sensorId}</td>
			<td>{event.playerId}</td>
			<td>{event.value}</td>
			<td>{event.eventDateUtc}</td>
		</tr>
	{/each}
</table>
