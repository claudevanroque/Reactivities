
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController() : BaseApiController
{
	[HttpGet]
	public async Task<ActionResult<List<Activity>>> GetActivities()
	{
		return await Mediator.Send(new GetActivityList.Query());
	}

	[HttpGet("{id}")]
	public async Task<ActionResult<Activity>> GetActivity(string id)
	{
		// throw new Exception("This is a test exception to check the exception middleware.");
		return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));
	}

	[HttpPost]
	public async Task<ActionResult<string>> CreateActivity(CreateActivityDto createActivityDto)
	{
		return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = createActivityDto }));
	}

	[HttpPut]
	public async Task<IActionResult> EditActivity(EditActivityDto editActivityDto)
	{
		return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = editActivityDto }));
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteActivity(string id)
	{
		return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
	}
}
