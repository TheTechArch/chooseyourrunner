namespace ChooseYourRunner.Server.Calculation;

using ChooseYourRunner.Server.Models;

public static class SexAdjuster
{
    /// <summary>
    /// Applies a sex-based pace adjustment factor.
    /// Research consistently shows an ~11% performance gap between male and female
    /// runners at comparable training levels across distances from 800m to marathon.
    /// The gap narrows slightly at ultra distances and with higher training levels.
    /// </summary>
    public static double GetSexFactor(Sex sex, TrainingLevel trainingLevel)
    {
        if (sex == Sex.Male)
            return 1.0;

        // Base gap ~11%, narrowing slightly at higher training levels
        // Elite women are closer to elite men than untrained women are to untrained men
        double gap = trainingLevel switch
        {
            TrainingLevel.Peak => 0.10,      // 10% — elite gap is tighter
            TrainingLevel.Strong => 0.105,   // 10.5%
            TrainingLevel.Regular => 0.11,   // 11% — standard observed gap
            TrainingLevel.Casual => 0.115,   // 11.5%
            TrainingLevel.Untrained => 0.12, // 12% — wider at untrained level
            _ => 0.11
        };

        return 1.0 + gap;
    }
}
