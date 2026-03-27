namespace ChooseYourRunner.Server.Services;

using ChooseYourRunner.Server.Calculation;
using ChooseYourRunner.Server.Models;

public class ComparisonService : IComparisonService
{
    public ComparisonResult Compare(ComparisonRequest request)
    {
        var predictionA = PerformanceCalculator.Calculate(request.RunnerA, request.Route);
        var predictionB = PerformanceCalculator.Calculate(request.RunnerB, request.Route);

        var timeDiff = predictionA.PredictedTime - predictionB.PredictedTime;
        var absDiff = timeDiff.Duration();

        string winnerName;
        if (absDiff.TotalSeconds < 15)
            winnerName = "";
        else if (timeDiff < TimeSpan.Zero)
            winnerName = predictionA.Name;
        else
            winnerName = predictionB.Name;

        string summary = GenerateSummary(predictionA, predictionB, absDiff, winnerName);

        return new ComparisonResult(
            predictionA,
            predictionB,
            absDiff,
            winnerName,
            summary
        );
    }

    private static string GenerateSummary(RunnerPrediction a, RunnerPrediction b, TimeSpan diff, string winner)
    {
        if (diff.TotalSeconds < 15)
            return "Too close to call — virtually identical!";

        if (diff.TotalSeconds < 30)
            return $"{winner} is slightly faster — about {(int)diff.TotalSeconds} seconds ahead";

        if (diff.TotalMinutes < 1.5)
        {
            int lowSec = Math.Max(10, (int)(diff.TotalSeconds * 0.8));
            int highSec = (int)(diff.TotalSeconds * 1.2);
            return $"{winner} is about {lowSec} to {highSec} seconds faster on this leg";
        }

        if (diff.TotalMinutes < 5)
        {
            int lowMin = Math.Max(1, (int)Math.Floor(diff.TotalMinutes * 0.8));
            int highMin = (int)Math.Ceiling(diff.TotalMinutes * 1.2);
            return $"{winner} is about {lowMin} to {highMin} minutes faster on this leg";
        }

        return $"{winner} dominates this route by over {(int)diff.TotalMinutes} minutes";
    }
}
