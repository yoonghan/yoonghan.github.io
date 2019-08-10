import {exec} from "../components/CommandBar/ExecuteCommand";
import {mount} from 'enzyme';
import Output from "../components/CommandBar/Output";
import InvalidCommand from "../components/CommandBar/InvalidCommand";

const globalAny:any = global;
const sampleDivElement:any = globalAny.document.createElement('div');
const sampleCallback:any = ()=>{console.log("Nothing")};
const sampleRoute:any = undefined;

const postCommandBar = exec(
  sampleDivElement,
  sampleCallback,
  sampleRoute
);

describe('CommandBar', () => {
  describe('Math', () => {
    it('can count 1 plus 1', function () {
      const input = mount(postCommandBar("=1+1"));
      expect(input.matchesElement(<Output output={2} />)).toBe(true);
    }),
    it('can solve complex arithmetic', function () {
      const input = mount(postCommandBar("=1+1*2 + 7"));
      expect(input.matchesElement(<Output output={10} />)).toBe(true);
    }),
    it('knows it is non-math', function () {
      const input = mount(postCommandBar("=1+A+2"));
      expect(input.matchesElement(<InvalidCommand invalidCommand={"Unable to evaluate."}/>)).toBe(true);
    }),
    it('can help', function () {
      const input = mount(postCommandBar("="));
      expect(input.matchesElement(<InvalidCommand invalidCommand={"Provide an equation"}/>)).toBe(true);
    })
  }),

  describe('Synonym', () => {
    it('should man===help', function () {
      const helpOutput = JSON.stringify(postCommandBar("help"));
      const manualOutput = JSON.stringify(postCommandBar("man"));
      expect(helpOutput).toBe(manualOutput);
    })
  })
});
