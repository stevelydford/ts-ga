import { Generator } from './Generator';
import { ConsoleOutputter } from './ConsoleOutputter';

(() => { new Generator().generate(new ConsoleOutputter()); })();