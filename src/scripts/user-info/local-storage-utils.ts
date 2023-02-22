export function writeResultToLocal(result: any) {
    let results = getFromLocal("progress")

    console.log("Current results:", results)
    result = [result]
    if (results)
        result.push(...results) // reverse order

    writeToLocal("progress", JSON.stringify(result))
}

export function writeToLocal(key: string, value: any) {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, value)
    } else {
        console.log("Could not write to local storage for key: " + key)
    }
}

export function getFromLocal(key: string) {
    if (typeof window !== "undefined")
        return JSON.parse(localStorage.getItem(key) as string)
}
