import { Member } from './Member';

export class Population {
    private readonly desiredResult = "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111";
    private readonly mutationPercentChance = 1;
    private members: Member[] = [];

    constructor(populationSize: number, memberLength: number) {
        this.seedPopulation(populationSize, memberLength);
    }

    public breed(): Member {
        const fittest = this.getFittest(this.desiredResult);

        for (const member of this.members) {
            let newMemberValue = '';
            for (let i = 0; i < member.value.length; i++) {
                if (this.generateRandomNumber(0, 100) < this.mutationPercentChance) {
                    newMemberValue += member.value === '0'
                        ? '0'
                        : '1';
                } else {
                    newMemberValue += this.crossPollinate(fittest.value[i], member.value[i]);
                }
            }

            member.value = newMemberValue;
            member.fitness = this.calculateFitness(newMemberValue);
        }
        return fittest;
    }

    private crossPollinate(fittestValue: string, memberValue: string) {
        return (this.generateRandomBit() === 1)
            ? fittestValue
            : memberValue;
    }

    private seedPopulation(populationSize: number, memberLength: number) {
        for (let i = 0; i < populationSize; i++) {           
            const newMember = new Member(this.generateBinaryString(memberLength));
            this.members.push(newMember);
        }
    }
    
    private getFittest(desiredResult: string): Member {
        const memberArray  = this.members.slice(0);
        for (const member of memberArray) {
            member.fitness = this.calculateFitness(member.value);
        }

        return this.getFittestMember(memberArray);
    }

    private calculateFitness(memberValue: string): number {
        return (memberValue.match(/1/g) || []).length;
    }

    private getFittestMember(members: Member[]): Member {
        return members.reduce((previousMember, currentMember) => {
            return (currentMember.fitness > previousMember.fitness) 
                ? currentMember 
                : previousMember;
        });
    }

    private generateBinaryString(size: number): string {
        let  binaryString: string = '';
        for (let i = 0; i < size; i++) {
            binaryString += this.generateRandomBit().toString();
        }

        return binaryString;
    }

    private generateRandomBit(): number {
        const randomBit = (Math.random() > 0.5) ? 1 : 0;
        return randomBit;
    }

    private generateRandomNumber(minValue: number, maxValue: number): number {
        return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    }
}