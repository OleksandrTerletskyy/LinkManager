using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using LM.Data.Abstract;
using LM.Entities;

namespace LM.Data.Concrete
{
	public class LinkRepository : ILinkRepository
	{
		private readonly Db _db = new Db();

		public Link AddLink(Link link)
		{
			// next link id will be 1 more then maximum existing id
			// or 1 in case there are no links in db
			link.Id =  _db.Links.Any() ?_db.Links.Max(l => link.Id) + 1 : 1;
			_db.Links.Add(link);
			_db.SaveChanges();
			return link;
		}

		public void RemoveLink(int id)
		{
			Link linkToDelete = _db.Links.Find(id);
			if (linkToDelete == null)
			{
				throw new ArgumentException("Link with such id not exists");
			}
			_db.Links.Remove(linkToDelete);
			_db.SaveChanges();
		}

		public void UpdateLink(Link link)
		{
			var targetLink = _db.Links.Find(link.Id);
			if (targetLink == null)
			{
				throw new ArgumentException("Link with such id can't be updated because it doesn't exists");
			}
			targetLink.LinkText = link.LinkText;
			_db.SaveChanges();
		}

		public Link GetLinkById(int id)
		{
			Link link = _db.Links.Find(id);
			if (link == null)
			{
				throw new ArgumentException("Link with such id not exists");
			}
			return link;
		}

		public IEnumerable<Link> GetAllLinks()
		{
			return _db.Links.ToList();
		}
	}
}
