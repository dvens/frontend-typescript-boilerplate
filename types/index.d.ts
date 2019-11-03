interface Window {
    EnvironmentSettings: {
        environment: string;
    };
}

declare module '*.scss';

declare module '*.md' {
    const value: string;
    export default value;
}
