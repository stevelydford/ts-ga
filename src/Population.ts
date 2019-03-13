import { Member } from './Member';
import { RandomGenerators } from './RandomGenerators';

export class Population {
    private readonly mutationPercentChance: number;
    private members: Member[] = [];

    constructor(populationSize: number, memberLength: number, mutationPercentChance: number) {
        this.mutationPercentChance = mutationPercentChance;
        this.seedPopulation(populationSize, memberLength);
    }

    public breed(): void {
        let currentFittestMember = this.getFittestMember();
        
        for (const member of this.members) {
            let newMemberValue = '';
            for (let i = 0; i < member.value.length; i++) {
                newMemberValue += this.shouldMutate()
                    ?  member.value === '0' ? '0' : '1'
                    :  this.crossPollinate(currentFittestMember.value[i], member.value[i]);
            }

            member.value = newMemberValue;
            member.fitness = this.calculateFitness(newMemberValue);
        }
    }

    public getFittestMember(): Member {
        return this.members.reduce((previousMember, currentMember) => {
            return (currentMember.fitness > previousMember.fitness) 
                ? currentMember 
                : previousMember;
        });
    }

    private seedPopulation(populationSize: number, memberLength: number) {
        for (let i = 0; i < populationSize; i++) {           
            const newMember = new Member(RandomGenerators.generateBinaryString(memberLength));
            this.members.push(newMember);
        }
    }

    private shouldMutate() : boolean {
        return RandomGenerators.generateRandomNumber(0, 100) < this.mutationPercentChance;
    }

    private crossPollinate(fittestValue: string, memberValue: string) {
        return (RandomGenerators.generateRandomBit() === 1)
            ? fittestValue
            : memberValue;
    }

    private calculateFitness(memberValue: string): number {
        return (memberValue.match(/1/g) || []).length;
    }
}