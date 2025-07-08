using System;
using Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities.Queries;

public class GetAcitvityDetails
{
	public class Query : IRequest<Activity>
	{
		public required string Id { get; set; }
	}


	public class Handler(AppDbContext _context, ILogger<GetActivityList> logger) : IRequestHandler<Query, Activity>
	{
		public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
		{
			var activity = await _context.Activities.FindAsync(request.Id, cancellationToken);
			if (activity == null) throw new Exception("Activity not found");
			return activity;
		}
	}
}
