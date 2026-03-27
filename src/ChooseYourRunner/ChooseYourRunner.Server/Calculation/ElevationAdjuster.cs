namespace ChooseYourRunner.Server.Calculation;

using ChooseYourRunner.Server.Models;

public static class ElevationAdjuster
{
    public static double GetElevationFactor(Route route, TrainingLevel trainingLevel)
    {
        if (route.ElevationGainM <= 0 || route.DistanceKm <= 0)
            return 1.0;

        // Calculate gradient as percentage
        double gradient = (route.ElevationGainM / (route.DistanceKm * 1000)) * 100;

        // Base elevation penalty
        double basePenalty;
        if (gradient <= 1.0)
            basePenalty = gradient * 0.03; // 0-3% penalty for gentle slopes
        else if (gradient <= 5.0)
            basePenalty = 0.03 + (gradient - 1.0) * 0.05; // steeper penalty
        else
            basePenalty = 0.03 + 0.20 + (gradient - 5.0) * 0.06; // very steep

        // Training level modifier: better trained = handles elevation better
        double trainingModifier = trainingLevel switch
        {
            TrainingLevel.Peak => 0.70,
            TrainingLevel.Strong => 0.80,
            TrainingLevel.Regular => 0.90,
            TrainingLevel.Casual => 1.05,
            TrainingLevel.Untrained => 1.20,
            _ => 1.0
        };

        return 1.0 + (basePenalty * trainingModifier);
    }
}
