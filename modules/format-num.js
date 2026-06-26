
export function formatNum(num) {
    if (num > 1e6) {
        return (num / (1e6)).toFixed(1) + " Million"
    } else if (num > 1e9) {
        return (num / (1e9)).toFixed(1) + " Billion"
    } else {
        return num
    }
}