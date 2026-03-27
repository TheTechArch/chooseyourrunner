export type TrainingLevel = 'Untrained' | 'Casual' | 'Regular' | 'Strong' | 'Peak';
export type Sex = 'male' | 'female';

export const TRAINING_LEVELS: TrainingLevel[] = ['Untrained', 'Casual', 'Regular', 'Strong', 'Peak'];

export interface RunnerInput {
  name: string;
  age: number;
  sex: Sex;
  trainingLevel: TrainingLevel;
}

export interface RouteInput {
  distanceKm: number;
  elevationGainM: number;
}

export interface RunnerPrediction {
  name: string;
  predictedTime: string;
  paceMinPerKm: number;
}

export interface ComparisonResult {
  runnerA: RunnerPrediction;
  runnerB: RunnerPrediction;
  timeDifference: string;
  winnerName: string;
  summary: string;
}

export interface ComparisonRequest {
  runnerA: RunnerInput;
  runnerB: RunnerInput;
  route: RouteInput;
}

export interface PresetLeg {
  label: string;
  distanceKm: number;
  elevationGainM: number;
  profile: string;
}

export const HOLMENKOLLSTAFETTEN_LEGS: PresetLeg[] = [
  { label: 'Etappe 1 — Knud Knudsens pl. → Louises gt.',       distanceKm: 1.10, elevationGainM: 30,  profile: 'Kupert' },
  { label: 'Etappe 2 — Louises gt. → Wolffs gt.',              distanceKm: 1.07, elevationGainM: 50,  profile: 'Bratt stigning' },
  { label: 'Etappe 3 — Wolffs gt. → Wilh. Færdens vei',       distanceKm: 0.60, elevationGainM: 5,   profile: 'Flat' },
  { label: 'Etappe 4 — Wilh. Færdens vei → Forskningsveien',  distanceKm: 1.92, elevationGainM: 40,  profile: 'Kupert' },
  { label: 'Etappe 5 — Forskningsveien → Holmenveien',         distanceKm: 1.21, elevationGainM: 20,  profile: 'Kupert' },
  { label: 'Etappe 6 — Holmenveien → Slemdal skole',           distanceKm: 1.25, elevationGainM: 60,  profile: 'Bratt stigning' },
  { label: 'Etappe 7 — Slemdal skole → Besserud',              distanceKm: 1.77, elevationGainM: 87,  profile: 'Bratt stigning' },
  { label: 'Etappe 8 — Besserud → Gressbanen',                 distanceKm: 1.78, elevationGainM: 5,   profile: 'Nedover' },
  { label: 'Etappe 9 — Gressbanen → Holmendammen',             distanceKm: 0.63, elevationGainM: 0,   profile: 'Nedover' },
  { label: 'Etappe 10 — Holmendammen → Frognerparken',         distanceKm: 2.86, elevationGainM: 10,  profile: 'Nedover' },
  { label: 'Etappe 11 — Frognerparken → Nordraaks gt.',        distanceKm: 1.52, elevationGainM: 25,  profile: 'Kupert' },
  { label: 'Etappe 12 — Nordraaks gt. → Arno Bergs pl.',       distanceKm: 0.35, elevationGainM: 0,   profile: 'Flat' },
  { label: 'Etappe 13 — Arno Bergs pl. → Camilla Collets vei', distanceKm: 1.08, elevationGainM: 15,  profile: 'Lett stigning' },
  { label: 'Etappe 14 — Camilla Collets vei → Bislettgata',    distanceKm: 0.71, elevationGainM: 0,   profile: 'Flat' },
  { label: 'Etappe 15 — Bislettgata → Bislett Mål',            distanceKm: 0.54, elevationGainM: 3,   profile: 'Flat' },
];
