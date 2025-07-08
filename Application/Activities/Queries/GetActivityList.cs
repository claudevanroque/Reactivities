using System;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
	public class Query : IRequest<List<Activity>> {}

	public class Handler(AppDbContext _context) : IRequestHandler<Query, List<Activity>>
	{
		public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
		{
			return await _context.Activities.ToListAsync(cancellationToken);
		}
	}
}
