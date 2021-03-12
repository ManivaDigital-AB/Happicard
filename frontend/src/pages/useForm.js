import { useState } from 'react'

import { getChildData, cloneDeepLimited } from './utils'

const useForm = (initialValues) => {
  const [formValues, setFormValues] = useState(initialValues)

  return [
    formValues,
    ({ target }) => {
      const { name, value, checked, type, id } = target
      const isCheckbox = type === 'checkbox'
      const isRadio = type === 'radio'

      setFormValues((data) => {
        const dataClone = cloneDeepLimited(data)
        const keys = name.split('.') // 'a.b.c' => ['a', 'b', 'c'] | 'a' => ['a']
        const nestedSegments = keys.slice(0, -1) // ['a', 'b'] | []
        const [finalSegment] = keys.slice(-1) // 'c' | 'a'
        const finalData = nestedSegments.reduce(getChildData, dataClone)
        finalData[finalSegment] = isCheckbox ? checked : value
        if(name == "happicard_delivery_date")
        {dataClone.happicard_delivery_date = value}else{dataClone.happicard_delivery_date = data.happicard_delivery_date}
        
        return dataClone
      })
    },
  ]
}

export default useForm
