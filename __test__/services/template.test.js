import { Test } from './test'

describe('test', () => {
    it('test case 1', async () => {
        let testClass = new Test()
        expect(testClass.add(2, 2)).toBe(4)
    })

    it('test case 2', async () => {
        let testClass = new Test()
        expect(testClass.add(2, 2)).not.toBe(5)
    })
})