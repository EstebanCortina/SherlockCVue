import { defineStore } from 'pinia'

export const useJobPositionProcessStore = defineStore('currentJobPositionProcess', {
  state: () => ({
    processData: null
  }),
  actions: {
    //@ts-ignore
    setProcessData(data) {
      this.processData = data
    }
  }
})
