import { expect, test } from 'vitest'
import { setDay, calculateSalary } from './fuctions'

test('setDay 8 to equal 8', () => {
  expect(setDay(8)).toBe(8)
})

test('setDay -3 to equal 0', () => {
  expect(setDay(-2)).toBe(0)
})

test('setDat 33 to equal 0', () => {
  expect(setDay(32)).toBe(0)
})

test('calculateSalary price:1400, days: 20, overtime: 0, bonus: 0 to equal 224000 ', () => {
  expect(calculateSalary(1400, 20, 0, 0)).toBe(224000)
})

test('calculateSalary price:1400, days: 20, overtime: 0, bonus: 50000 to equal 274000 ', () => {
  expect(calculateSalary(1400, 20, 0, 50000)).toBe(274000)
})

test('calculateSalary price:1400, days: 20, overtime: 10, bonus: 0 to equal 274000 ', () => {
  expect(calculateSalary(1400, 20, 10, 0)).toBe(241500)
})