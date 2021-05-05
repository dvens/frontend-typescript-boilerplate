import path from 'path';

export function normalizePath(path: string) {
    if (path.startsWith('/')) {
        return path.substring(1, path.length);
    }

    return path;
}
