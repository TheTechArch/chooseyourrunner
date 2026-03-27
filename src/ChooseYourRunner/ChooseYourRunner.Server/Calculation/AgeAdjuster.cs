namespace ChooseYourRunner.Server.Calculation;

public static class AgeAdjuster
{
    public static double GetAgeFactor(int age)
    {
        // Peak performance window: 22-32
        if (age >= 22 && age <= 32)
            return 1.0;

        // Young but not yet peak: 16-21
        if (age < 22)
        {
            var yearsFromPeak = 22 - age;
            return 1.0 + (yearsFromPeak * 0.008); // ~0.8% per year under 22
        }

        // Gradual decline after 32
        var yearsOver = age - 32;
        // Accelerating decline: starts gentle, increases with age
        return 1.0 + (yearsOver * 0.004) + (yearsOver * yearsOver * 0.0001);
    }
}
