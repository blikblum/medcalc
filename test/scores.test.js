import { expect } from 'chai'
import { ckdEpi, gfrStage } from '../index.js'

describe('scores', () => {
  describe('ckdEpi', () => {
    it('should return undefined on invalid input', () => {
      let tfg = ckdEpi({})
      expect(tfg).to.be.undefined

      tfg = ckdEpi({ age: 60, gender: null })
      expect(tfg).to.be.undefined

      tfg = ckdEpi({ age: null, gender: 'M' })
      expect(tfg).to.be.undefined

      tfg = ckdEpi({ creat: NaN, age: 30, gender: 'M' })
      expect(tfg).to.be.undefined
    })

    // reference results from https://qxmd.com/calculate/calculator_251/egfr-using-ckd-epi
    it('should calculate TFG', () => {
      const tfg = ckdEpi({ creat: 1.4, age: 60, gender: 'M' })
      expect(tfg).to.equal(54.2)
    })

    it('should account for gender', () => {
      const tfg = ckdEpi({ creat: 1.4, age: 60, gender: 'F' })
      expect(tfg).to.equal(40.7)
    })

    it('should account for race', () => {
      const tfg = ckdEpi({ creat: 1.4, age: 60, gender: 'M', isBlack: true })
      expect(tfg).to.equal(62.8)
    })

    it('should account for gender and race', () => {
      const tfg = ckdEpi({ creat: 1.4, age: 60, gender: 'F', isBlack: true })
      expect(tfg).to.equal(47.2)
    })
  })

  describe('gfrStage', () => {
    it('return undefined on invalid input', () => {
      expect(gfrStage({ tfg: NaN })).to.be.undefined
      expect(gfrStage({ tfg: null })).to.be.undefined
      expect(gfrStage({})).to.be.undefined
    })

    it('should be calculated based on tfg', () => {
      expect(gfrStage({ tfg: 90 })).to.be.equal('1')
      expect(gfrStage({ tfg: 100 })).to.be.equal('1')
      expect(gfrStage({ tfg: 80 })).to.be.equal('2')
      expect(gfrStage({ tfg: 60 })).to.be.equal('2')
      expect(gfrStage({ tfg: 54 })).to.be.equal('3a')
      expect(gfrStage({ tfg: 30 })).to.be.equal('3b')
      expect(gfrStage({ tfg: 20 })).to.be.equal('4')
      expect(gfrStage({ tfg: 9 })).to.be.equal('5')
    })
  })
})
