using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController() : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator =>
            _mediator ??= HttpContext.RequestServices.GetService<IMediator>() // x ??= y"If x is null, then assign it the value of y. Otherwise, leave it unchanged."
                ?? throw new InvalidOperationException("Mediator not found in the request services.");
    }
}
