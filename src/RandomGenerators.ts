export abstract class RandomGenerators {         
    public static generateBinaryString(size: number): string {
        let  binaryString: string = '';
        for (let i = 0; i < size; i++) {
            binaryString += this.generateRandomBit().toString();
        }

        return binaryString;
    }

    public static generateRandomBit(): number {
        const randomBit = (Math.random() > 0.5) ? 1 : 0;
        return randomBit;
    }

    public static generateRandomNumber(minValue: number, maxValue: number): number {
        return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    }
}