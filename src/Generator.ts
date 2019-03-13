import { Member } from './Member';
import { Population } from './Population';
import { IOutputter } from './IOuputter';

export class Generator {
    public generate(outputter: IOutputter): void {
        const populationSize = 2000;
        const memberLength = 128;
        const maxGenerationCount = 100;
        const currentPopulation = new Population(populationSize, memberLength);
        
        let count = 0;
        let fitness = 0;

        while (fitness < memberLength && count < maxGenerationCount) {
            const fittest = currentPopulation.breed();
            fitness = fittest.fitness;
            count++;
            outputter.outputResult(count, fittest);
        }
    }
}