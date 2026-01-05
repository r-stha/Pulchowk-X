<script lang="ts">
	import {
		MapLibre,
		GeolocateControl,
		FullScreenControl,
		GeoJSONSource,
		FillLayer,
		SymbolLayer,
	} from "svelte-maplibre-gl";
	import type { FeatureCollection } from "geojson";
	import pulchowk from "./pulchowk.json";
	import { fade } from "svelte/transition";

	const pulchowkData = pulchowk as FeatureCollection;

	const labels = pulchowkData.features.slice(1);

	let search = $state("");
	let showSuggestions = $state(false);
	let selectedIndex = $state(-1);
	let mapCenter = $state<[number, number]>([85.319319, 27.682102]);
	let map: any = $state();

	let isLoaded = $state(false);

	// Filter suggestions based on search
	const filteredSuggestions = $derived(
		search.trim()
			? labels
					.filter((label) =>
						label.properties?.description
							?.toLowerCase()
							.includes(search.toLowerCase()),
					)
					.slice(0, 8)
			: [],
	);

	function selectSuggestion(description: string) {
		search = description;
		showSuggestions = false;
		selectedIndex = -1;

		const selectedLocation = labels.find(
			(label) => label.properties?.description === description,
		);

		if (selectedLocation?.geometry?.type === "Polygon") {
			const coordinates = selectedLocation.geometry.coordinates[0];
			const centroid = coordinates.reduce(
				(acc, coord) => {
					acc[0] += coord[0];
					acc[1] += coord[1];
					return acc;
				},
				[0, 0],
			);
			centroid[0] /= coordinates.length;
			centroid[1] /= coordinates.length;
			if (map) {
				map.flyTo({
					center: [centroid[0], centroid[1]],
					zoom: 18,
					speed: 1.2,
					curve: 1.42,
					essential: true,
				});
			}
		} else if (selectedLocation?.geometry?.type === "Point") {
			const coords = selectedLocation.geometry.coordinates;
			if (map) {
				map.flyTo({
					center: [coords[0], coords[1]],
					zoom: 18,
					speed: 1.2,
					curve: 1.42,
					essential: true,
				});
			}
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!filteredSuggestions.length) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			selectedIndex = Math.min(
				selectedIndex + 1,
				filteredSuggestions.length - 1,
			);
			scrollToSelected();
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, -1);
			scrollToSelected();
		} else if (e.key === "Enter" && selectedIndex >= 0) {
			e.preventDefault();
			const selectedProperties =
				filteredSuggestions[selectedIndex].properties;
			if (selectedProperties?.description)
				selectSuggestion(selectedProperties.description);
		} else if (e.key === "Escape") {
			showSuggestions = false;
			selectedIndex = -1;
		}
	}

	function scrollToSelected() {
		setTimeout(() => {
			const selectedElement = document.querySelector(
				`[data-suggestion-index="${selectedIndex}"]`,
			);
			if (selectedElement) {
				selectedElement.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
				});
			}
		}, 0);
	}
</script>

<div class="relative w-full h-full min-h-[80vh]">
	<div
		class="absolute top-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4"
	>
		<div class="relative">
			<svg
				class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				></path>
			</svg>
			<input
				bind:value={search}
				type="text"
				placeholder="Search locations..."
				class="w-full pl-12 pr-4 py-3 rounded-lg shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400"
				onfocus={() => (showSuggestions = true)}
				oninput={() => (showSuggestions = true)}
				onblur={() => setTimeout(() => (showSuggestions = false), 200)}
				onkeydown={handleKeydown}
			/>
			{#if search}
				<button
					aria-label="Clear search"
					onclick={() => {
						search = "";
						showSuggestions = false;
						selectedIndex = -1;
					}}
					class="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
				>
					<svg
						class="w-5 h-5 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				</button>
			{/if}

			<!-- Autocomplete Suggestions Dropdown -->
			{#if showSuggestions && filteredSuggestions.length > 0}
				<div
					class="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
					transition:fade={{ duration: 150 }}
				>
					<ul class="max-h-64 overflow-y-auto">
						{#each filteredSuggestions as suggestion, index}
							<li>
								<button
									data-suggestion-index={index}
									onclick={() =>
										suggestion.properties?.description &&
										selectSuggestion(
											suggestion.properties.description,
										)}
									class="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0 {index ===
									selectedIndex
										? 'bg-blue-50'
										: ''}"
								>
									<svg
										class="w-4 h-4 text-gray-400 shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										></path>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										></path>
									</svg>
									<span
										class="text-gray-800 font-medium flex-1"
									>
										{suggestion.properties?.description}
									</span>
								</button>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- No Results Message -->
			{#if showSuggestions && search.trim() && filteredSuggestions.length === 0}
				<div
					class="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 p-4"
					transition:fade={{ duration: 150 }}
				>
					<div class="flex items-center gap-2 text-gray-500">
						<svg
							class="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<span class="text-sm">No locations found</span>
					</div>
				</div>
			{/if}
		</div>
	</div>

	{#if !isLoaded}
		<div
			class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-50 text-gray-600"
			out:fade={{ duration: 300 }}
		>
			<svg
				class="animate-spin h-8 w-8 mb-2"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					class="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
			<p class="font-medium animate-pulse">Loading Map...</p>
		</div>
	{/if}

	<MapLibre
		bind:map
		zoom={15}
		center={mapCenter}
		class="size-150 mx-auto"
		style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
		onclick={(e) => {
			const latitude = e.lngLat.lat;
			const longitude = e.lngLat.lng;
			navigator.clipboard.writeText(`[${longitude}, ${latitude}]`);
		}}
		onload={() => (isLoaded = true)}
		maxBounds={[
			[85.3169503963058, 27.678307122280273],
			[85.32594099531451, 27.68641618791375],
		]}
	>
		<GeoJSONSource data={pulchowkData} maxzoom={22}>
			<FillLayer
				paint={{
					"fill-color": "#fff",
					"fill-opacity": 1,
					"fill-outline-color": "#333",
				}}
			/>
			<SymbolLayer
				layout={{
					"text-field": "{description}",
					"text-size": 10,
					"text-anchor": "top",
					"text-justify": "center",
					"text-max-width": 5,
				}}
				paint={{
					"text-color": "green",
				}}
			/>
		</GeoJSONSource>

		<GeolocateControl
			position="top-right"
			positionOptions={{ enableHighAccuracy: true }}
			trackUserLocation={true}
			showAccuracyCircle={true}
			fitBoundsOptions={{ zoom: 18 }}
		/>

		<FullScreenControl position="top-right" />
	</MapLibre>
</div>
