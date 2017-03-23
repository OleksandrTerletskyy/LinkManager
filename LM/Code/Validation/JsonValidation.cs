using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using LM.Models;

namespace LM.Code.Validation
{
	public static class JsonValidation
	{
		public static void GetJsonWithValidation(ModelStateDictionary modelState, ref ResponseWithValidation response)
		{
			var errors = new List<ValidationError>();
			if (!modelState.IsValid)
			{
				foreach (var key in modelState.Keys)
				{
					errors.AddRange(modelState[key].Errors.Select(error => new ValidationError
					{
						Key = key,
						Message = error.ErrorMessage
					}));
				}
				response.Errors.AddRange(errors);
			}
		}
	}
}