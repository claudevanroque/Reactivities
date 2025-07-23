

using System.Text.Json;
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) : IMiddleware
{
	public async Task InvokeAsync(HttpContext context, RequestDelegate next)
	{
		try
		{
			await next(context);
		}
		catch (ValidationException ex)
		{
			await HandleValidationExceptionAsync(context, ex);	
		}
		catch (Exception ex)
		{
			await HandleExeptionAsync(context, ex);
		}
	}

	private async Task HandleExeptionAsync(HttpContext context, Exception ex)
	{
		logger.LogError(ex, ex.Message);
		context.Response.ContentType = "application/json";
		context.Response.StatusCode = StatusCodes.Status500InternalServerError;

		var response = env.IsDevelopment()
			? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace)
			: new AppException(context.Response.StatusCode, ex.Message, null);

		var options = new JsonSerializerOptions
		{
			PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
			// WriteIndented = true
		};

		var json = JsonSerializer.Serialize(response, options);
		
		await context.Response.WriteAsync(json);
	}

	private static async Task HandleValidationExceptionAsync(HttpContext context, ValidationException ex)
	{
		var validationErrors = new Dictionary<string, string[]>();

		if (ex.Errors is not null)
		{
			foreach (var error in ex.Errors)
			{
				if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
				{
					// validationErrors[error.PropertyName] = existingErrors.Append(error.ErrorMessage).ToArray();
					validationErrors[error.PropertyName] = [.. existingErrors, error.ErrorMessage];
				}
				else
				{
					// validationErrors[error.PropertyName] = new[] { error.ErrorMessage };
					validationErrors[error.PropertyName] = [error.ErrorMessage];
				}
			}
		}
		context.Response.StatusCode = StatusCodes.Status400BadRequest;

		var validationProblemDetails = new ValidationProblemDetails(validationErrors)
		{
			Status = StatusCodes.Status400BadRequest,
			Type = "ValidationFailure",
			Title = "Validation Error",
			Detail = "One or more validation errors occurred.",
			Instance = context.Request.Path
		};

		await context.Response.WriteAsJsonAsync(validationProblemDetails);
	}
}
