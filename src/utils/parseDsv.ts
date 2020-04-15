import { parse } from 'papaparse'

export default (delimiter: string) => (dsv: string): string[][] =>
// @ts-ignore
  parse(dsv.trim(), { delimiter }).data//.data.map(line => line.map((d: string) => d.trim()))
