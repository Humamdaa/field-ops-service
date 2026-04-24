export const requireStringParam = (value: unknown, name: string): string => {
    if (!value) throw new Error(`${name} is required`)
    if (Array.isArray(value)) return value[0]
    return value as string
}