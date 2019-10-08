function getDefaultMode() {
    const modeArg = process.argv.find(arg => arg.startsWith('--mode='));
    if (modeArg) {
        return modeArg.replace('--mode=', '');
    }

    const indexOf = process.argv.indexOf('--mode');
    return indexOf === -1 ? 'production' : process.argv[indexOf + 1];
};

module.exports = getDefaultMode;
