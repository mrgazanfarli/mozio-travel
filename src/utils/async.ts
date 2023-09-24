export async function stall(stallTime = 1500) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
}
