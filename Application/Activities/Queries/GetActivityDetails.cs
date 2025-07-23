using System;
using Application.Core;
using Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
	public class Query : IRequest<Result<Activity>>
	{
		public required string Id { get; set; }
	}


	public class Handler(AppDbContext _context) : IRequestHandler<Query, Result<Activity>>
	{
		public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
		{
			var activity = await _context.Activities.FindAsync(request.Id, cancellationToken);
			if (activity == null) throw new Exception("Activity not found");

			return Result<Activity>.Success(activity);
		}
	}
}
