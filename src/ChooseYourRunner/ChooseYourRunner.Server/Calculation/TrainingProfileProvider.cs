namespace ChooseYourRunner.Server.Calculation;

using ChooseYourRunner.Server.Models;

public static class TrainingProfileProvider
{
    // Base pace in minutes per km on flat ground
    private static readonly Dictionary<TrainingLevel, double> BasePaces = new()
    {
        { TrainingLevel.Untrained, 7.5 },   // 7:30/km
        { TrainingLevel.Casual, 6.25 },      // 6:15/km
        { TrainingLevel.Regular, 5.5 },      // 5:30/km
        { TrainingLevel.Strong, 4.75 },      // 4:45/km
        { TrainingLevel.Peak, 4.0 },         // 4:00/km
    };

    public static double GetBasePace(TrainingLevel level)
    {
        return BasePaces[level];
    }
}
