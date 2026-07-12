import { getServerSession } from '@/lib/auth';
import { briefsAPI } from '@/api/briefs';

export async function getBriefsAction({ surface }) {

  if (surface === 'list-view') {
    const res = await briefsAPI.server.getAll({
      next: { 
        revalidate: 600, // Cache for 10 minutes, or use tags
        tags: ['blogs-list'] 
      }
    });

    return res;
  }

  if (surface === 'dashboard') {
    const session = await getServerSession();

    const isAdmin = session.role === 'admin';
    const userId = session.id;

    const fetchMethod = isAdmin 
      ? () => briefsAPI.server.getAll()
      : () => briefsAPI.server.getByAuthor(userId, { cache: 'no-store' });

      
        const res = await fetchMethod();
        return res;

    }

  throw new Error('Invalid surface');
}
