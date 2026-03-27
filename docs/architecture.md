# Choose Your Runner - Architecture

## Overview

Choose Your Runner is a two-tier web application with a React frontend and an ASP.NET Core backend API. All calculation logic lives server-side. The frontend is purely presentational and interactive.

```
┌─────────────────────────────────────────────────────┐
│                    Frontend                         │
│          React 19 + TypeScript + Vite               │
│        Tailwind CSS 4 + Designsystemet              │
│                                                     │
│  ┌─────────────┐    VS    ┌─────────────┐          │
│  │  Runner A    │         │  Runner B    │          │
│  │  Panel       │         │  Panel       │          │
│  └─────────────┘         └─────────────┘          │
│           ┌─────────────────────┐                   │
│           │   Route Settings    │                   │
│           └─────────────────────┘                   │
│           ┌─────────────────────┐                   │
│           │  Comparison Result  │                   │
│           └─────────────────────┘                   │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP / JSON
                       │ POST /api/comparison
                       ▼
┌─────────────────────────────────────────────────────┐
│                   Backend API                       │
│             ASP.NET Core (.NET 10)                  │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │              API Layer                        │   │
│  │  ComparisonController                         │   │
│  └──────────────────┬───────────────────────────┘   │
│                     │                               │
│  ┌──────────────────▼───────────────────────────┐   │
│  │           Service Layer                       │   │
│  │  ComparisonService                            │   │
│  └──────────────────┬───────────────────────────┘   │
│                     │                               │
│  ┌──────────────────▼───────────────────────────┐   │
│  │         Calculation Engine                    │   │
│  │  PerformanceCalculator                        │   │
│  │  AgeAdjuster                                  │   │
│  │  ElevationAdjuster                            │   │
│  │  TrainingProfileProvider                      │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │            Domain Models                      │   │
│  │  Runner, Route, TrainingLevel,                │   │
│  │  ComparisonRequest, ComparisonResult          │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## Technology Stack

| Layer      | Technology                                      |
| ---------- | ----------------------------------------------- |
| Frontend   | React 19, TypeScript 5.9, Vite 8                |
| Styling    | Tailwind CSS 4                                  |
| Components | Designsystemet (@digdir/designsystemet-react)   |
| Backend    | ASP.NET Core, .NET 10                           |
| API format | REST / JSON                                     |
| API docs   | OpenAPI (built-in)                               |
| Hosting    | SPA proxy in dev, static files served by .NET    |

---

## Backend Structure

```
ChooseYourRunner.Server/
├── Controllers/
│   └── ComparisonController.cs       # POST /api/comparison
├── Models/
│   ├── Runner.cs                     # Name, Age, TrainingLevel
│   ├── Route.cs                      # Distance, ElevationGain
│   ├── TrainingLevel.cs              # Enum: Untrained..Peak
│   ├── ComparisonRequest.cs          # RunnerA + RunnerB + Route
│   └── ComparisonResult.cs           # Times, paces, difference, summary
├── Services/
│   ├── IComparisonService.cs
│   └── ComparisonService.cs          # Orchestrates calculation
├── Calculation/
│   ├── PerformanceCalculator.cs      # Core time estimation
│   ├── TrainingProfileProvider.cs    # Base pace per training level
│   ├── AgeAdjuster.cs               # Age-based adjustment factor
│   └── ElevationAdjuster.cs         # Elevation-based adjustment
└── Program.cs
```

### Domain Models

```csharp
// Runner input
public record Runner(string Name, int Age, TrainingLevel TrainingLevel);

// Route input
public record Route(double DistanceKm, double ElevationGainM);

// Training levels (5-step scale)
public enum TrainingLevel { Untrained, Casual, Regular, Strong, Peak }

// API request
public record ComparisonRequest(Runner RunnerA, Runner RunnerB, Route Route);

// API response
public record ComparisonResult(
    RunnerPrediction RunnerA,
    RunnerPrediction RunnerB,
    TimeSpan TimeDifference,
    string Summary          // e.g. "Runner A is about 30-60 seconds faster"
);

public record RunnerPrediction(
    string Name,
    TimeSpan PredictedTime,
    double PaceMinPerKm
);
```

### API Contract

```
POST /api/comparison
Content-Type: application/json

{
  "runnerA": { "name": "Kari", "age": 35, "trainingLevel": "Strong" },
  "runnerB": { "name": "Ola", "age": 25, "trainingLevel": "Casual" },
  "route":   { "distanceKm": 5.2, "elevationGainM": 120 }
}

Response 200:
{
  "runnerA": { "name": "Kari", "predictedTime": "00:24:30", "paceMinPerKm": 4.71 },
  "runnerB": { "name": "Ola", "predictedTime": "00:27:15", "paceMinPerKm": 5.24 },
  "timeDifference": "00:02:45",
  "summary": "Kari is about 2-3 minutes faster on this leg"
}
```

### Calculation Engine Design

The engine is a pipeline of adjustments applied to a base pace:

```
Base Pace (from TrainingLevel)
  → apply Age Adjustment factor
  → apply Elevation Adjustment factor
  → multiply by Distance
  = Predicted Time
```

Each adjuster is its own class with a single responsibility. This keeps the model easy to tune and extend without touching other adjusters.

**Key design principle**: Training level is the primary driver of performance. Age is a secondary modifier. A Peak 50-year-old beats an Untrained 20-year-old.

---

## Frontend Structure

```
chooseyourrunner.client/src/
├── main.tsx                          # Entry point
├── App.tsx                           # Root layout and routing
├── api/
│   └── comparisonApi.ts              # POST /api/comparison fetch wrapper
├── types/
│   └── models.ts                     # TypeScript types matching API contract
├── components/
│   ├── layout/
│   │   └── MatchupScreen.tsx         # Full split-screen layout
│   ├── runner/
│   │   ├── RunnerPanel.tsx           # One side of the VS screen
│   │   ├── RunnerForm.tsx            # Name, age, training level inputs
│   │   └── RunnerAvatar.tsx          # Visual character (placeholder for MVP)
│   ├── route/
│   │   └── RouteForm.tsx             # Distance + elevation inputs
│   └── result/
│       └── ComparisonResult.tsx      # Time predictions and diff display
├── hooks/
│   └── useComparison.ts             # Manages API call and state
├── index.css                         # Tailwind directives + global styles
└── App.css                           # App-level layout styles
```

### Component Hierarchy

```
App
└── MatchupScreen
    ├── RunnerPanel (left)
    │   ├── RunnerAvatar
    │   └── RunnerForm (Designsystemet inputs)
    ├── VS divider
    ├── RunnerPanel (right)
    │   ├── RunnerAvatar
    │   └── RunnerForm (Designsystemet inputs)
    ├── RouteForm (center/bottom)
    ├── Compare Button
    └── ComparisonResult
```

### Styling Strategy

- **Tailwind CSS 4** for layout, spacing, colors, responsive design, and the game-inspired visual identity (gradients, transitions, bold typography)
- **Designsystemet components** (`@digdir/designsystemet-react`) for form controls: text fields, selects/dropdowns, buttons, sliders, cards — gives a polished, accessible baseline
- Custom Tailwind classes for the split-screen matchup layout, VS element, and avatar area

---

## Data Flow

```
1. User fills in Runner A, Runner B, and Route on the matchup screen
2. User clicks "Compare" (or inputs auto-trigger on change)
3. Frontend POSTs ComparisonRequest to /api/comparison
4. ComparisonController validates input, calls ComparisonService
5. ComparisonService runs the calculation pipeline:
   a. TrainingProfileProvider → base pace for each runner
   b. AgeAdjuster → age factor applied
   c. ElevationAdjuster → elevation factor applied
   d. PerformanceCalculator → final time = adjusted pace × distance
   e. Build summary text
6. ComparisonResult returned as JSON
7. Frontend displays predictions, difference, and summary
```

---

## Key Architecture Decisions

| Decision | Rationale |
| --- | --- |
| All calculation server-side | Keeps logic in one place, testable in C#, frontend stays thin |
| No database for MVP | Stateless comparison — no persistence needed yet |
| Separate adjuster classes | Each factor (age, elevation, training) can be tuned/tested independently |
| Designsystemet for form UI | Accessible, Norwegian design system, consistent look with minimal effort |
| Tailwind for custom layout | The split-screen game UI needs custom styling beyond a component library |
| Single API endpoint for MVP | One POST covers the entire comparison — simple to build and consume |
| TypeScript types mirror API | Shared contract — backend is source of truth, frontend types match |

---

## Future Extension Points

These are **not in MVP** but the architecture supports them:

- **Relay planner**: Add a `/api/relay` endpoint, reuse calculation engine for multiple legs
- **Preset routes**: Add a `/api/routes` endpoint returning known legs (e.g. Holmenkollstafetten stages)
- **Avatar system**: `RunnerAvatar` component is isolated, can be swapped from placeholder to animated SVG/canvas
- **Additional adjusters**: New calculation factors (weather, terrain type) are just new adjuster classes plugged into the pipeline
