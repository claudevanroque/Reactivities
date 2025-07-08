
using Application.Activities.Commands;
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
		return await Mediator.Send(new GetAcitvityDetails.Query { Id = id });
	}

	[HttpPost]
	public async Task<ActionResult<string>> CreateActivity(Activity activity)
	{
		return await Mediator.Send(new CreateActivity.Command { Activity = activity });
	}

	[HttpPut]
	public async Task<IActionResult> EditActivity(Activity activity)
	{
		await Mediator.Send(new EditActivity.Command { Activity = activity });
		return NoContent();
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteActivity(string id)
	{
		await Mediator.Send(new DeleteActivity.Command { Id = id });
		return Ok();
	}
}
