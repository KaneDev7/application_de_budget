import { afterEach, describe, expect, it, vi } from "vitest"
import { LocalelStorage } from "../js/storage"



describe('depenses Service', () => {
    
    // const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')

    afterEach(() => {
        // getItemSpy.mockClear()
        localStorage.clear()
      })

    describe('getDepense', () => {

      it('gets depenses from LocalStorage', () => {
        const storage = new LocalelStorage()
        const item = {
          id: 1,
          title: 'Electricité',
          montant: 10000,
        }

        localStorage.setItem("depense", JSON.stringify([item]))
        expect(storage.getDataFromLocaleStorage('depense')).toStrictEqual([item])
      })

      it('gets todos from LocalStorage without setting them :[] ', () => {
        const storage = new LocalelStorage()
        expect(storage.getDataFromLocaleStorage('depense')).toStrictEqual([])
      })
      
    })
  })