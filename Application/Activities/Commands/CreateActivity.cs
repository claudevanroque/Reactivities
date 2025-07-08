using System;
using Domain.Entities;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
	public class Command : IRequest<string>
	{
		public required Activity Activity { get; set; }
	}

	public class Handler(AppDbContext _context) : IRequestHandler<Command, string>
	{
		public async Task<string> Handle(Command request, CancellationToken cancellationToken)
		{
			_context.Activities.Add(request.Activity);
			await _context.SaveChangesAsync(cancellationToken);
			return request.Activity.Id;
		}
	}
}
