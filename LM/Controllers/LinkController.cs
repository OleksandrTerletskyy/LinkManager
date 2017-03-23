using System.Web.Mvc;
using LM.Code.Validation;
using LM.Data.Concrete;
using LM.Entities;
using LM.Models;
using Newtonsoft.Json;

namespace LM.Controllers
{
	public class LinkController : Controller
	{
		private readonly LinkRepository _linkRepository = new LinkRepository();

		public ActionResult Index()
		{
			return View();
		}

		[HttpGet]
		public JsonResult GetLinks()
		{
			var links = _linkRepository.GetAllLinks();
			var temp = JsonConvert.SerializeObject(links);
			return Json(temp, JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public ActionResult AddLink(Link link)
		{
			var response = new ResponseWithValidation();
			JsonValidation.GetJsonWithValidation(ModelState, ref response);
			if(ModelState.IsValid)
			{
				Link addedLink = _linkRepository.AddLink(link);
				response.Data = addedLink;
			}			
			return Json(JsonConvert.SerializeObject(response));
		}

		[HttpPost]
		public ActionResult UpdateLink(Link link)
		{
			var response = new ResponseWithValidation();
			JsonValidation.GetJsonWithValidation(ModelState, ref response);
			if(ModelState.IsValid)
			{
				_linkRepository.UpdateLink(link);
			}
			return Json(JsonConvert.SerializeObject(response));
		}

		[HttpPost]
		public ActionResult RemoveLink(int id)
		{
			_linkRepository.RemoveLink(id);
			return new EmptyResult();
		}
	}
}