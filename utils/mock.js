import mockjs from 'mockjs'

export default function (str) {
  try {
    let res = (new Function(`return ${str}`))()
    res = mockjs.mock(res)
    return res
  } catch (e) {
    throw new Error(e)
  }
}
