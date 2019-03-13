import { IOutputter } from './IOuputter';
import { Member } from './Member';

export class ConsoleOutputter implements IOutputter {
    public outputResult(resultCount: number, fittestMember: Member): void {
        console.log(`${resultCount.toString().padStart(3, "0")}: ${fittestMember.value} [${fittestMember.fitness}]`);
    }
    
}