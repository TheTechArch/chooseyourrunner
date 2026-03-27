namespace ChooseYourRunner.Server.Controllers;

using Microsoft.AspNetCore.Mvc;
using ChooseYourRunner.Server.Models;
using ChooseYourRunner.Server.Services;
using System.ComponentModel.DataAnnotations;

[ApiController]
[Route("api/[controller]")]
public class ComparisonController : ControllerBase
{
    private readonly IComparisonService _comparisonService;

    public ComparisonController(IComparisonService comparisonService)
    {
        _comparisonService = comparisonService;
    }

    [HttpPost]
    public ActionResult<ComparisonResult> Compare([FromBody] ComparisonRequest request)
    {
        var errors = ValidateRequest(request);
        if (errors.Count > 0)
            return BadRequest(new { errors });

        var result = _comparisonService.Compare(request);
        return Ok(result);
    }

    private static List<string> ValidateRequest(ComparisonRequest request)
    {
        var errors = new List<string>();

        ValidateRunner(request.RunnerA, "Runner A", errors);
        ValidateRunner(request.RunnerB, "Runner B", errors);

        if (request.Route.DistanceKm < 0.1 || request.Route.DistanceKm > 50)
            errors.Add("Distance must be between 0.1 and 50 km");

        if (request.Route.ElevationGainM < 0 || request.Route.ElevationGainM > 2000)
            errors.Add("Elevation gain must be between 0 and 2000 m");

        return errors;
    }

    private static void ValidateRunner(Runner runner, string label, List<string> errors)
    {
        if (string.IsNullOrWhiteSpace(runner.Name) || runner.Name.Length > 50)
            errors.Add($"{label} name is required (max 50 characters)");

        if (runner.Age < 16 || runner.Age > 99)
            errors.Add($"{label} age must be between 16 and 99");

        if (!Enum.IsDefined(typeof(TrainingLevel), runner.TrainingLevel))
            errors.Add($"{label} has an invalid training level");

        if (!Enum.IsDefined(typeof(Sex), runner.Sex))
            errors.Add($"{label} has an invalid sex value");
    }
}
