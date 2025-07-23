
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
	public class Command : IRequest<Result<Unit>>
	{
		public required EditActivityDto ActivityDto { get; set; }
	}

	public class Handler(AppDbContext _context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
	{
		public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
		{
			var activity = await _context.Activities.FindAsync([request.ActivityDto.Id], cancellationToken);
			if (activity == null) throw new Exception("Activity not found");
	
			mapper.Map(request.ActivityDto, activity);

			var result = await _context.SaveChangesAsync(cancellationToken) > 0;

			if (!result) throw new Exception("Failed to update activity");

			return Result<Unit>.Success(Unit.Value);
		}
	}
}
