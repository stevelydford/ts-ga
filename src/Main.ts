import { ConsoleOutputter } from './ConsoleOutputter';
import { Generator } from './Generator';

(() => { new Generator().generate(new ConsoleOutputter()); })();