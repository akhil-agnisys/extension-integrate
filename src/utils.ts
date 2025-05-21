// src/utils.ts

export function formatDocstring(docstring: string): string {
    return docstring.trim().replace(/\n/g, ' ');
}

export function extractTypeHints(signature: string): string[] {
    const typeHints = signature.match(/:\s*([^\s]+)/g);
    return typeHints ? typeHints.map(hint => hint.trim().slice(1)) : [];
}

export function formatFunctionSignature(name: string, params: string[]): string {
    return `${name}(${params.join(', ')})`;
}

export function parseFunctionName(line: string): string | null {
    const match = line.match(/def\s+(\w+)/);
    return match ? match[1] : null;
}

export function parseParameters(line: string): string[] {
    const match = line.match(/\(([^)]+)\)/);
    return match ? match[1].split(',').map(param => param.trim()) : [];
}