import { Member } from './Member';

export interface IOutputter{
    outputResult(resultCount: number, fittestMember: Member): void;
}