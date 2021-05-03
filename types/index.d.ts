interface Window {
    EnvironmentSettings: {
        environment: string;
    };
}
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.scss' {
    const value: string;
    export default value;
}

declare module '*.css' {
    const value: string;
    export default value;
}

declare module '*.md' {
    const value: string;
    export default value;
}

declare module '*.json' {
    const value: any;
    export default value;
}
