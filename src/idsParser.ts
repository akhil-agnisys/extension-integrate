import * as fs from 'fs';
import * as path from 'path';

export class IdsParser {
    private idsFilePath: string;

    constructor(idsFilePath: string) {
        this.idsFilePath = idsFilePath;
    }

    public parse(): IdsFunction[] {
        const content = fs.readFileSync(this.idsFilePath, 'utf-8');
        const functionRegex = /def\s+(\w+)\s*\(([^)]*)\)\s*:\s*"""\s*([^]*?)\s*"""/g;
        const functions: IdsFunction[] = [];
        let match;

        while ((match = functionRegex.exec(content)) !== null) {
            const name = match[1];
            const params = this.parseParameters(match[2]);
            const docstring = match[3].trim();
            functions.push({ name, params, docstring });
        }

        return functions;
    }

    private parseParameters(paramString: string): IdsParameter[] {
        return paramString.split(',').map(param => {
            const [name, type] = param.split(':').map(p => p.trim());
            return { name, type: type || 'Any' };
        });
    }
}

interface IdsFunction {
    name: string;
    params: IdsParameter[];
    docstring: string;
}

interface IdsParameter {
    name: string;
    type: string;
}