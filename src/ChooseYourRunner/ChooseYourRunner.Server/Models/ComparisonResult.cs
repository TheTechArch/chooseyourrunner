namespace ChooseYourRunner.Server.Models;

public record ComparisonResult(
    RunnerPrediction RunnerA,
    RunnerPrediction RunnerB,
    TimeSpan TimeDifference,
    string WinnerName,
    string Summary
);
