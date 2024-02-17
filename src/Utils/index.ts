/**
 * Builds className out of provided classes or objects. If class can be used it will be used otherwise, it will be dissmised
 * @param string
 * @returns
 */
export const buildClass = (...classes: string[]) => {
  const builtClass = classes
    .join(' ')
    .split(' ')
    .filter(className => typeof className === 'string' && className.length && className.length > 0)
    .sort()
    .join(' ')
    .replace(/\s+/g, ' ')
    .trimEnd();
  return builtClass.length > 0 ? builtClass : null;
};

/**
 * create slug from string
 * @param string - string to be slugified
 * @returns
 */
export const slugify = (string: string) => {
  return string
    .toLowerCase()
    .replace(/\s/gim, '-')
    .normalize('NFKD')
    .replace(/[^\w-]/g, '');
}

export const saveLanguageToLocalStorage = (language: string) => {
  localStorage.setItem('language', language);
};

export const getLanguageFromLocalStorage = () => {
  return localStorage.getItem('language');
};
