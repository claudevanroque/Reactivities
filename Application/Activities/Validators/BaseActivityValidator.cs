using System;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class BaseActivityValidator<T, TDto> : AbstractValidator<T> where TDto : BaseActivityDto
{
	public BaseActivityValidator(Func<T, TDto> selector)
	{
		RuleFor(x => selector(x).Title)
			.NotEmpty()
			.WithMessage("Activity title is required.");

		RuleFor(x => selector(x).Date)
			.NotEmpty()
			.WithMessage("Activity date is required.")
			.Must(date => date > DateTime.UtcNow)
			.WithMessage("Activity date must be in the future.");

		RuleFor(x => selector(x).Description)
			.NotEmpty()
			.WithMessage("Activity description is required.");

		RuleFor(x => selector(x).Category)
			.NotEmpty()
			.WithMessage("Activity category is required.")
			.MaximumLength(50)
			.WithMessage("Activity category must not exceed 50 characters.")
			.MinimumLength(3)
			.WithMessage("Activity category must be at least 3 characters long.")
			.Matches(@"^[a-zA-Z\s]+$")
			.WithMessage("Category can only contain letters and spaces.");

		RuleFor(x => selector(x).City)
			.NotEmpty()
			.WithMessage("Activity city is required.")
			.MaximumLength(100)
			.WithMessage("Activity city must not exceed 100 characters.")
			.MinimumLength(2)
			.WithMessage("Activity city must be at least 2 characters long.")
			.Matches(@"^[a-zA-Z\s]+$")
			.WithMessage("City can only contain letters and spaces.");

		RuleFor(x => selector(x).Venue)
			.NotEmpty()
			.WithMessage("Activity venue is required.")
			.MaximumLength(100)
			.WithMessage("Activity venue must not exceed 100 characters.")
			.MinimumLength(2)
			.WithMessage("Activity venue must be at least 2 characters long.");

		RuleFor(x => selector(x).Latitude)
			.NotEmpty()
			.WithMessage("Activity latitude is required.")
			.Must(lat => lat >= -90 && lat <= 90)
			.WithMessage("Latitude must be between -90 and 90.");

		RuleFor(x => selector(x).Longitude)
			.NotEmpty()
			.WithMessage("Activity longitude is required.")
			.Must(lon => lon >= -180 && lon <= 180)
			.WithMessage("Longitude must be between -180 and 180.");
	}
}
