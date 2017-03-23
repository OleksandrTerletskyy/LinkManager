using System.Collections.Generic;
using LM.Entities;

namespace LM.Data.Abstract
{
	interface ILinkRepository
	{
		Link AddLink(Link link);
		void RemoveLink(int id);
		void UpdateLink(Link link);
		Link GetLinkById(int id);
		IEnumerable<Link> GetAllLinks();
	}
}
