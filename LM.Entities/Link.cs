using System;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace LM.Entities
{
	public class Link
	{
		[JsonProperty(PropertyName = "id")]
		public int Id { set; get; }

		[Url(ErrorMessage = "Server: Please enter a valid url !")]
		[Required(ErrorMessage = "Server: Field can't be empty !")]
		[JsonProperty(PropertyName = "link")]
		public string LinkText { set; get; }

		[JsonProperty(PropertyName = "created")]
		public DateTime CreationDate { set; get; }
	}
}
