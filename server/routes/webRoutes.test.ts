import * as fs from 'fs';

import { getRoutes } from './webRoutes';

describe('Server | webRoutes', function() {
    describe('getRoutes', function() {
        it('returns an array with the routes', () => {
            const files = ['contact-us.html', 'about.html'];
            const expectedResult = ['contact-us', 'about'];
            const result = getRoutes(files);
            expect(result).toEqual(expectedResult);
        });
    });
});
