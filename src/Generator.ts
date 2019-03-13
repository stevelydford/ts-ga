import { Population } from './Population';
import { IOutputter } from './IOuputter';

export class Generator {
    public generate(outputter: IOutputter): void {
        const populationSize = 2000;
        const memberLength = 128;
        const mutationPercentChance = 1;

        const maxGenerationCount = 100;
    
        const currentPopulation = new Population(populationSize, memberLength, mutationPercentChance);
        
        let count = 0;
        let currentFittestMember = currentPopulation.getFittestMember();
        while (currentFittestMember.fitness < memberLength && count < maxGenerationCount) {
            currentPopulation.breed();
            currentFittestMember = currentPopulation.getFittestMember();
            count++;
            outputter.outputResult(count, currentFittestMember);
        }
    }
}