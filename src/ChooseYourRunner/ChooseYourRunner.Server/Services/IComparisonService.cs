namespace ChooseYourRunner.Server.Services;

using ChooseYourRunner.Server.Models;

public interface IComparisonService
{
    ComparisonResult Compare(ComparisonRequest request);
}
