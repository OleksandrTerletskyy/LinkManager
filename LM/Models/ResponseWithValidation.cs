using System.Collections.Generic;

namespace LM.Models
{
	public class ResponseWithValidation
	{
		public ResponseWithValidation()
		{
				Errors = new List<ValidationError>();
		}
		public dynamic Data { set; get; }
		public List<ValidationError> Errors { set; get; }
	}
}