export default (separator: string) => (dsv: string) =>
  dsv.split('\n')
    .map(line => line.split(separator).map(d => d.trim()))