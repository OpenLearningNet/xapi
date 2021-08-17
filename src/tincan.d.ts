declare module 'tincan' {
    declare class Statement {
        id: string | null;
        actor: any;
        verb: any;
        target: any;
        result: any;
        context: any;
        timestamp: string | null;
        stored: string | null;
        authority: any;
        attachments: any;
        version: string | null;
        degraded: boolean;
        voided: boolean | null;
        inProgress: boolean | null;
        originalJSON: string | null;

        constructor(statement: Record<string, any>);
    }

    declare class LRS {
        constructor(config: any);
        saveStatement(statement: Statement, config: any);
    }
}
