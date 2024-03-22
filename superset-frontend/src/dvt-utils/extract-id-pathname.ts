export const extractIdPathname = (pathName: string, name: string) => {
  const regex = new RegExp(`^\\/${name}\\/(\\d+)\\/?$`);
  const isPage = regex.test(pathName);

  if (isPage) {
    const id = pathName.match(regex)?.[1];
    return `/${name}/${id}/` ?? null;
  }

  return null;
};
