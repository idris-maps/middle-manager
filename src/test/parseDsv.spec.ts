import test from 'ava'
import parseDsv from '../utils/parseDsv'

test('parseDsv 1', t => {
  const csv = `
      Year,Make,Model,Description,Price
      1997,Ford,E350,"ac, abs, moon",3000.00
      1999,Chevy,"Venture ""Extended Edition""","",4900.00
      1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00
      1996,Jeep,Grand Cherokee,"MUST SELL!
      air, moon roof, loaded",4799.00
  `.trim()
  const lines = parseDsv(',')(csv)
  const [ head, ...rest ] = lines
  t.true(!rest.map(line => line.length === head.length).includes(false))
})

test('parseDsv 2', t => {
  const csv = `
    Index,Item,Cost,Tax,Total
    1,"Fruit of the Loom Girl's Socks",7.97,0.60,8.57
    2,"Rawlings Little League Baseball",2.97,0.22,3.19
    3,"Secret Antiperspirant",1.29,0.10,1.39
    4,"Deadpool DVD",14.96,1.12,16.08
    5,"Maxwell House Coffee 28 oz",7.28,0.55,7.83
    6,"Banana Boat Sunscreen, 8 oz",6.68,0.50,7.18
    7,"WrenchSet, 18 pieces",10.00,0.75,10.75
    8,"Mand M,42 oz",8.98,0.67,9.65
    9,"Bertoli Alfredo Sauce",2.12,0.16,2.28
    10,"Large Paperclips, 10boxes",6.19,0.46,6.65
  `
  const lines = parseDsv(',')(csv)
  const [ head, ...rest ] = lines
  t.true(!rest.map(line => line.length === head.length).includes(false))

})