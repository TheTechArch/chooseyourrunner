namespace ChooseYourRunner.Server.Calculation;

using ChooseYourRunner.Server.Models;

public static class PerformanceCalculator
{
    public static RunnerPrediction Calculate(Runner runner, Route route)
    {
        double basePace = TrainingProfileProvider.GetBasePace(runner.TrainingLevel);
        double sexFactor = SexAdjuster.GetSexFactor(runner.Sex, runner.TrainingLevel);
        double ageFactor = AgeAdjuster.GetAgeFactor(runner.Age);
        double elevationFactor = ElevationAdjuster.GetElevationFactor(route, runner.TrainingLevel);

        double adjustedPace = basePace * sexFactor * ageFactor * elevationFactor;
        double totalMinutes = adjustedPace * route.DistanceKm;

        return new RunnerPrediction(
            runner.Name,
            TimeSpan.FromMinutes(totalMinutes),
            Math.Round(adjustedPace, 2)
        );
    }
}
