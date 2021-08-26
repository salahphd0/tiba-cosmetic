interface settings {
  maintainanceMode?: boolean;
}

enum COLLECTIONS {
  USERS = 'USERS',
  CATEGORIES = 'CATEGORIES',
  ITEMS = 'ITEMS',
}
enum PAGES {
  LOGIN = '/login',
  HOME = '/home',
}
export async function sleep(n: number): Promise<void> {
  return await new Promise((resolve) =>
    setTimeout(resolve, n > 10 ? n : n * 1000)
  );
}
export { COLLECTIONS, PAGES };
