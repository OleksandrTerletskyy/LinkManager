using System.Data.Entity;
using LM.Entities;

namespace LM.Data
{
	class Db: DbContext
	{
		public Db()
            : base("name=DbConnection")
        {
		}

		public DbSet<Link> Links { get; set; }

	}
}
